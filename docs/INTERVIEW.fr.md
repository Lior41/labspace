# Préparer un entretien — LABSPACE

[Regarder l’explication en français](../public/demo/walkthrough-fr.mp4) · [Lire son texte](../public/demo/walkthrough-fr.txt). Montage de captures réelles, avec explications intégrées, sans piste audio.

## Présentation d’environ trois minutes

LABSPACE est un laboratoire virtuel pour les enfants et leurs parents. Son idée est de transformer une petite question en un moment partagé : on pose une question, on fait une prédiction, on manipule, puis on compare ce que l’on pensait avec ce que l’on observe. Une prédiction incorrecte n’est jamais punie.

La première expérience compare le trajet d’une balle sur Terre et sur la Lune. On donne exactement la même impulsion aux deux balles et on ne change que la gravité. L’enfant peut observer que la balle reste plus longtemps en l’air lorsque la gravité est plus faible. Le parent dispose de questions simples pour accompagner la découverte sans devoir connaître la réponse à l’avance.

Le produit s’adapte à trois tranches d’âge. Pour les quatre à six ans, les actions passent surtout par de grands boutons et un parent accompagne l’expérience. Pour les sept à dix ans, on peut modifier davantage de paramètres et comparer les mesures. Les plus grands disposent d’explications quantitatives et de contrôles plus précis. Il ne s’agit donc pas seulement de changer la taille du texte.

La partie technique importante est le moteur scientifique. Les positions affichées sont calculées à partir de fonctions déterministes et testées. Le même calcul fournit l’animation, les mesures et les résultats enregistrés. Je documente les unités et les hypothèses : la trajectoire ignore la résistance de l’air, le pendule utilise une approximation de petit angle, et le mélange de lumières ne représente pas un mélange de peintures.

Le carnet conserve la prédiction, l’observation et les paramètres sur l’appareil. Une découverte peut être exportée ou rejouée. Ce choix permet une expérience sans compte et évite de collecter des noms ou des dates de naissance. Il a une limite claire : effacer les données du navigateur efface aussi le carnet.

L’IA est volontairement encadrée. Un parent peut demander une activité, mais le modèle ne peut sélectionner qu’un laboratoire et des paramètres autorisés. Les explications viennent de contenus préparés et les résultats viennent du moteur scientifique. L’application n’exécute jamais du code inventé par le modèle. Sans clé IA, elle annonce qu’elle utilise une activité prédéfinie.

Ce projet, développé avec assistance IA, me permet d’expliquer React, les états d’interface, la validation, les tests et la protection des données. Les prochaines améliorations seraient des essais avec des familles et enseignants, une validation pédagogique plus approfondie et une limitation partagée des appels IA avant ouverture publique de cette option.

La durée dépend de ton débit : répète avec un chronomètre et réserve quelques secondes à la démonstration. Ne récite pas une partie que tu ne sais pas encore expliquer.

## Questions et réponses

### Où est la base de données ?

Cette version n’a pas besoin de base serveur. Le carnet est local et le moteur fonctionne dans le navigateur. Ajouter une base sans besoin réel augmenterait la collecte de données et la maintenance.

### Comment garantis-tu la cohérence de l’animation ?

Les coordonnées viennent des mêmes fonctions que les mesures. Les deux trajectoires partagent la même échelle. Les paramètres et unités sont documentés et bornés.

### L’IA invente-t-elle les expériences ?

Elle sélectionne seulement un module et un preset autorisés. Le schéma et les règles métier refusent les combinaisons impossibles. Aucun résultat scientifique ne provient du modèle.

### Quelle différence entre les âges ?

Les jeunes choisissent des actions simples avec un parent. Les plus grands utilisent des curseurs, des mesures et des explications supplémentaires. On adapte l’interaction et pas seulement le vocabulaire.

### Comment protéges-tu les enfants ?

Pas de compte enfant, de classement public, de messagerie ni de collecte de date de naissance. La saisie libre de planification est réservée au parent et les expériences restent virtuelles.

### Quelles limites physiques ?

Pas de résistance de l’air, un pendule idéal à faible amplitude et des couleurs de moniteur. Présenter ces hypothèses est plus honnête que prétendre simuler toute la réalité.

### Et si le navigateur refuse le stockage ?

L’expérience reste utilisable. L’utilisateur voit une erreur claire et peut télécharger le dessin ; le produit ne promet pas une sauvegarde qu’il n’a pas effectuée.

### Que tester avant un lancement plus large ?

Les interactions avec de vraies familles, la compréhension des consignes, l’accessibilité, la cohérence scientifique et la maîtrise des coûts si l’IA est activée.

## Exercice pratique

Objectif : ajouter une nouvelle comparaison pédagogique sans casser le modèle.

1. Lis `src/lib/science.ts` et calcule à la main le sens du changement lorsqu’on augmente la gravité.
2. Ajoute un test vérifiant que la durée de vol diminue lorsque la gravité augmente, à vitesse et angle identiques.
3. Ajoute une explication courte pour les sept à dix ans dans la structure de contenus existante.
4. Vérifie les trois tranches d’âge dans le navigateur et le mode de réduction des animations.
5. Enregistre une découverte, recharge la page et rejoue ses réglages. Explique la différence entre un calcul et une animation décorative.

## Méthode d’apprentissage

Pour chaque fonction, explique son entrée, sa sortie, les erreurs possibles et le test qui les couvre. Montre les limites avec assurance. Dis « développé avec assistance IA, puis vérifié et étudié » plutôt que de t’attribuer une autonomie que tu n’as pas encore acquise.
