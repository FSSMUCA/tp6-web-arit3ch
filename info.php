<?php
$etablissement = "fssm";
$module = "Programmation Web";
$annee = 2025;

$a = 9;
$b = 4;

$addition = $a + $b;
$soustraction = $a - $b;
$multiplication = $a * $b;
$division = $a / $b;

echo "<h1>PHP</h1>";

echo "<h2>Établissement</h2>";
echo "<p>$etablissement</p>";

echo "<h2>Module</h2>";
echo "<p>$module</p>";

echo "<h2>Année</h2>";
echo "<p>$annee</p>";

echo "<h2>Variables Numériques</h2>";
echo "<p>a = $a</p>";
echo "<p>b = $b</p>";

echo "<h2>Résultats</h2>";
echo "<p>Addition : $a + $b = $addition</p>";
echo "<p>Soustraction : $a - $b = $soustraction</p>";
echo "<p>Multiplication : $a × $b = $multiplication</p>";
echo "<p>Division : $a ÷ $b = $division</p>";
?>
