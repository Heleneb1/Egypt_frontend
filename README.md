# 🏛️ Les Mystères de l'Égypte Antique

Application web interactive qui plonge l'utilisateur dans l'univers fascinant de l'Égypte Antique à travers des images, des quiz et des récits immersifs.

**🌐 Démo en ligne :** [app.lesmysteresdelegypteantique.fr](https://app.lesmysteresdelegypteantique.fr)

---

## ✨ Fonctionnalités

- **Accueil immersif** : Vidéo d'introduction avec effets visuels (fog, glow) pour une ambiance authentique
- **Catalogue de monuments** : Cartes interactives présentant les sites emblématiques avec images, informations sur les auteurs et intégration Google Street View
- **Quiz interactifs** : Testez vos connaissances sur l'Égypte Antique et débloquez des badges
- **Système d'authentification** : Connexion et inscription pour accéder aux fonctionnalités avancées
- **Design responsive** : Interface optimisée pour mobile, tablette et desktop
- **Animations fluides** : Transitions SCSS soignées, overlays textuels dynamiques

---

## 🛠️ Stack Technique

| Technologie     | Version/Description                            |
| --------------- | ---------------------------------------------- |
| **Framework**   | Angular 16                                     |
| **Langages**    | TypeScript, HTML, SCSS                         |
| **Librairies**  | RxJS, ngx-toastr, ngx-cookie-service, Three.js |
| **Tests**       | Jasmine + Karma                                |
| **CI/CD**       | CapRover                                       |
| **Hébergement** | OVH                                            |

---

## 📦 Installation Locale

### Prérequis

- **Node.js** ≥ 18.x
- **Angular CLI** : `npm install -g @angular/cli`
- **Git** pour cloner le repository

### Étapes d'installation

```bash
# 1. Cloner le projet
git clone git@github.com:<username>/Egypt_frontend.git
cd Egypt_frontend

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
ng serve -o
# L'application sera accessible sur http://localhost:4200

# 4. Build de production
ng build --configuration production
```

### Scripts disponibles

```bash
npm start          # Lancer le serveur de développement
npm run build      # Build de production
npm test           # Lancer les tests unitaires
npm run lint       # Vérifier la qualité du code
```

---

## 🌍 Déploiement

Le projet est déployé automatiquement via **CapRover** sur un serveur **OVH**.

### Pipeline de déploiement

1. **Build automatique** : Le dossier `dist/` est généré par la CI/CD
2. **CapRover** : Gère le déploiement et la mise à jour des containers
3. **OVH** : Fournit l'hébergement et le nom de domaine

### Configuration

- **URL de production** : `app.lesmysteresdelegypteantique.fr`
- **Serveur** : OVH
- **Orchestration** : CapRover

---

## 📁 Structure du Projet

```
Egypt_frontend/
├── src/
│   ├── app/                  # Composants Angular
│   │   ├── components/       # Composants réutilisables
│   │   ├── services/         # Services (API, auth, etc.)
│   │   ├── models/           # Modèles TypeScript
│   │   └── guards/           # Guards de navigation
│   ├── assets/               # Images, vidéos, icônes
│   ├── environments/         # Configuration par environnement
│   ├── styles.scss           # Styles globaux
│   └── index.html            # Point d'entrée HTML
├── angular.json              # Configuration Angular
├── package.json              # Dépendances npm
├── tsconfig.json             # Configuration TypeScript
└── README.md                 # Documentation
```

---

## 🔒 Sécurité & Maintenance

### ⚠️ Avertissement de sécurité

- Angular 16 présente des vulnérabilités connues (voir `npm audit`)
- **Migration prévue** vers Angular 20/21 pour renforcer la sécurité
- Les dépendances sont régulièrement auditées

### Bonnes pratiques

```bash
# Auditer les vulnérabilités
npm audit

# Mettre à jour les dépendances mineures
npm update

# Vérifier les versions obsolètes
npm outdated
```

---

## 🚫 Politique de Contribution

**⚠️ Ce projet est en lecture seule et n'accepte pas de contributions externes.**

Ce repository est un projet personnel non contributif. Aucune pull request, issue ou modification externe ne sera acceptée. L'usage et la modification du code sont réservés exclusivement au propriétaire.

---

## 📜 Licence

**Projet privé - Tous droits réservés**

Ce projet est la propriété exclusive de son auteur. Toute reproduction, distribution ou modification non autorisée est strictement interdite.

---

## 📧 Contact

Pour toute question concernant ce projet : [votre-email@example.com]

---

<p align="center">
  Fait avec ❤️ pour les passionnés d'Égypte Antique
</p>
