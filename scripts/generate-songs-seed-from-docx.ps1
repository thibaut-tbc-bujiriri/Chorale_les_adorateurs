param(
  [Parameter(Mandatory = $false)]
  [string]$DocxPath = "c:\Users\Thibaut\OneDrive\Desktop\LES ADORATEURS. OK OK.docx",

  [Parameter(Mandatory = $false)]
  [string]$OutputSqlPath = "supabase\sql\04_seed_songs_from_docx.sql",

  [Parameter(Mandatory = $false)]
  [string]$CategoryName = "Adoration",

  [Parameter(Mandatory = $false)]
  [string]$CategoryDescription = "Chants importes depuis le recueil Word"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Escape-SqlLiteral {
  param([string]$Value)

  if ($null -eq $Value) {
    return ""
  }

  return $Value.Replace("'", "''")
}

function Repair-Mojibake {
  param([string]$Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $Value
  }

  try {
    $bytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($Value)
    $fixed = [System.Text.Encoding]::UTF8.GetString($bytes)
    return $fixed
  }
  catch {
    return $Value
  }
}

function Get-CandidateHeader {
  param([string]$Line)

  $trimmed = $Line.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmed)) {
    return $null
  }

  if ($trimmed -notmatch "\(") {
    return $null
  }

  if ($trimmed.Length -lt 6) {
    return $null
  }

  $upper = @($trimmed.ToCharArray() | Where-Object { [char]::IsLetter($_) -and $_ -ceq [char]::ToUpperInvariant($_) }).Count
  $letters = @($trimmed.ToCharArray() | Where-Object { [char]::IsLetter($_) }).Count
  if ($letters -eq 0) {
    return $null
  }

  $ratio = $upper / $letters
  if ($ratio -lt 0.55) {
    return $null
  }

  if ($trimmed -match "^(?<title>.+?)\s*\((?<author>[^)]+)\)\s*(?<rest>.*)$") {
    $title = ([string]$Matches["title"]).Trim(" ", "-", ":", ",", ".")
    $author = ([string]$Matches["author"]).Trim()
    $rest = ([string]$Matches["rest"]).Trim()

    if (-not [string]::IsNullOrWhiteSpace($rest)) {
      $author = "$author $rest".Trim()
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
      return $null
    }

    if ([string]::IsNullOrWhiteSpace($author)) {
      $author = "Inconnu"
    }

    return @{
      title  = $title
      author = $author
    }
  }

  return $null
}

if (-not (Test-Path -LiteralPath $DocxPath)) {
  throw "Fichier introuvable: $DocxPath"
}

$workspaceRoot = (Get-Location).Path
$tempRoot = Join-Path $workspaceRoot ".tmp_docx_import_seed"
$zipPath = Join-Path $workspaceRoot ".tmp_docx_import_seed.zip"

if (Test-Path -LiteralPath $tempRoot) {
  Remove-Item -LiteralPath $tempRoot -Recurse -Force
}
if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Copy-Item -LiteralPath $DocxPath -Destination $zipPath -Force
Expand-Archive -LiteralPath $zipPath -DestinationPath $tempRoot -Force

$documentXmlPath = Join-Path $tempRoot "word\document.xml"
if (-not (Test-Path -LiteralPath $documentXmlPath)) {
  throw "document.xml introuvable dans le .docx extrait"
}

[xml]$doc = Get-Content -LiteralPath $documentXmlPath -Raw
$ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphNodes = @($doc.SelectNodes("//w:body/w:p", $ns))
$lines = New-Object System.Collections.Generic.List[string]

foreach ($p in $paragraphNodes) {
  $textNodes = @($p.SelectNodes(".//w:t", $ns))
  if ($null -eq $textNodes -or $textNodes.Count -eq 0) {
    $lines.Add("")
    continue
  }

  $chunks = New-Object System.Collections.Generic.List[string]
  foreach ($t in $textNodes) {
    $chunks.Add($t.InnerText)
  }

  $line = ($chunks -join "").Trim()
  $line = [regex]::Replace($line, "\s+", " ")
  $line = Repair-Mojibake -Value $line
  $lines.Add($line)
}

$songs = New-Object System.Collections.Generic.List[object]
$currentTitle = $null
$currentAuthor = $null
$currentLyrics = New-Object System.Collections.Generic.List[string]

for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  $candidate = Get-CandidateHeader -Line $line

  if ($null -ne $candidate) {
    if ($null -ne $currentTitle) {
      if ($currentLyrics.Count -ge 2) {
        $songs.Add([pscustomobject]@{
            title  = $currentTitle
            author = $currentAuthor
            lyrics = ($currentLyrics -join "`n").Trim()
          })
        $currentTitle = $null
        $currentAuthor = $null
        $currentLyrics = New-Object System.Collections.Generic.List[string]
      }
      else {
        if (-not [string]::IsNullOrWhiteSpace($line)) {
          $currentLyrics.Add($line)
        }
        continue
      }
    }

    $currentTitle = $candidate.title
    $currentAuthor = $candidate.author
    continue
  }

  if ($null -ne $currentTitle) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      $currentLyrics.Add("")
    }
    else {
      $currentLyrics.Add($line)
    }
  }
}

if ($null -ne $currentTitle) {
  $songs.Add([pscustomobject]@{
      title  = $currentTitle
      author = $currentAuthor
      lyrics = ($currentLyrics -join "`n").Trim()
    })
}

$filteredSongs = @($songs | Where-Object {
  -not [string]::IsNullOrWhiteSpace($_.title) -and
  -not [string]::IsNullOrWhiteSpace($_.lyrics)
})

if ($filteredSongs.Count -eq 0) {
  throw "Aucun chant detecte. Ajuste les regles de parsing si necessaire."
}

$valueRows = New-Object System.Collections.Generic.List[string]
for ($idx = 0; $idx -lt $filteredSongs.Count; $idx++) {
  $song = $filteredSongs[$idx]
  $number = "{0:d3}" -f ($idx + 1)
  $title = Escape-SqlLiteral -Value $song.title
  $author = Escape-SqlLiteral -Value $song.author
  $lyrics = Escape-SqlLiteral -Value $song.lyrics
  $category = Escape-SqlLiteral -Value $CategoryName
  $valueRows.Add("  ('$number', '$title', '$author', (select id from c where name = '$category'), '$lyrics')")
}

$categoryNameEscaped = Escape-SqlLiteral -Value $CategoryName
$categoryDescriptionEscaped = Escape-SqlLiteral -Value $CategoryDescription

$sql = @(
  "-- 04_seed_songs_from_docx.sql"
  "-- Genere automatiquement depuis $DocxPath"
  ""
  "insert into public.categories (name, description)"
  "values ('$categoryNameEscaped', '$categoryDescriptionEscaped')"
  "on conflict (name) do update set"
  "  description = excluded.description,"
  "  updated_at = now();"
  ""
  "with c as ("
  "  select id, name from public.categories"
  ")"
  "insert into public.songs (number, title, author, category_id, lyrics)"
  "values"
  (($valueRows -join ",`n") + "")
  "on conflict (number) do update set"
  "  title = excluded.title,"
  "  author = excluded.author,"
  "  category_id = excluded.category_id,"
  "  lyrics = excluded.lyrics,"
  "  updated_at = now();"
  ""
  "-- Total chants detectes: $($filteredSongs.Count)"
) -join "`n"

$outputFullPath = Join-Path $workspaceRoot $OutputSqlPath
$outputDir = Split-Path -Parent $outputFullPath
if (-not (Test-Path -LiteralPath $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

Set-Content -LiteralPath $outputFullPath -Value $sql -Encoding UTF8

Write-Host "Script SQL genere: $outputFullPath"
Write-Host "Nombre de chants: $($filteredSongs.Count)"
