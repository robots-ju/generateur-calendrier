# Générateur de calendrier

Un générateur de calendrier basique via le navigateur.

Comment utiliser :

- Installer les dépendances NPM : `npm i` ou `yarn install`
- Vérifier que les polices nécessaires sont installées (`Roboto`)
- Mettre à jour les jours fériés dans `src/js/joursFeries.js`
- Compiler avec `npm run dev` ou `yarn dev`
- Démarrer un webserver local dans `/site`
- Accéder à la page d'accueil, optionnellement ajouter `?year=20xx` pour spécifier une année différente
- Imprimer en PDF avec les contrôles du navigateur (optimisé pour Chrome : A4, portrait, aucune marge, échelle 100%, sans en-tête, activer graphiques d'arrière-plan)
- Ouvrir dans LibreOffice Draw ou autre logiciel qui peut utiliser un PDF comme modèle pour ajouter des photos
