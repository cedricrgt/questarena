export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-noir text-blanc p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-secondary mb-8 font-logo">
        Politique de Confidentialité
      </h1>

      <div className="space-y-8 text-gray-300">
        {/* Introduction */}
        <section>
          <p className="mb-4">
            La présente politique de confidentialité a pour but de vous informer sur la 
            manière dont <strong className="text-blanc">GamerChallenges</strong> collecte, 
            utilise et protège vos données personnelles, conformément au Règlement Général 
            sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>
          <p>
            En utilisant ce site, vous acceptez les pratiques décrites dans cette politique.
          </p>
        </section>

        {/* Responsable du traitement */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            1. Responsable du traitement des données
          </h2>
          <p className="mb-2">Le responsable du traitement des données est :</p>
          <ul className="list-none space-y-1 ml-4">
            <li><strong>Nom :</strong> Cédric RAGOT</li>
            <li><strong>Email :</strong>{" "}
              <a 
                href="mailto:cedric.ragot.paris@gmail.com"
                className="text-secondary hover:text-cta transition-colors underline"
              >
                cedric.ragot.paris@gmail.com
              </a>
            </li>
          </ul>
        </section>

        {/* Données collectées */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            2. Données personnelles collectées
          </h2>
          <p className="mb-4">
            Nous collectons les données personnelles suivantes lorsque vous créez un compte 
            et utilisez notre plateforme :
          </p>
          
          <h3 className="text-xl font-semibold text-secondary mb-3">
            2.1. Données d'inscription
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
            <li><strong>Nom d'utilisateur</strong> (pseudo)</li>
            <li><strong>Adresse email</strong></li>
            <li><strong>Mot de passe</strong> (stocké de manière chiffrée)</li>
            <li><strong>Avatar</strong> (URL de l'image de profil)</li>
          </ul>

          <h3 className="text-xl font-semibold text-secondary mb-3">
            2.2. Données d'utilisation
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
            <li><strong>Challenges créés</strong> (titre, description, règles, jeu, difficulté, image)</li>
            <li><strong>Participations</strong> (liens YouTube, descriptions)</li>
            <li><strong>Votes</strong> sur les challenges et participations</li>
            <li><strong>Date de création du compte</strong></li>
          </ul>

          <h3 className="text-xl font-semibold text-secondary mb-3">
            2.3. Données techniques
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Adresse IP</strong> (pour la sécurité et la prévention des abus)</li>
            <li><strong>Statut de connexion</strong> (en ligne/hors ligne via WebSocket)</li>
          </ul>
        </section>

        {/* Finalités */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            3. Finalités du traitement
          </h2>
          <p className="mb-4">Vos données personnelles sont collectées pour les finalités suivantes :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Création et gestion de votre compte utilisateur</li>
            <li>Permettre la participation aux challenges</li>
            <li>Affichage du classement (leaderboard)</li>
            <li>Gestion du système de votes</li>
            <li>Communication avec vous concernant le service</li>
            <li>Amélioration de nos services</li>
            <li>Prévention de la fraude et des abus</li>
          </ul>
        </section>

        {/* Base légale */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">4. Base légale du traitement</h2>
          <p className="mb-4">Le traitement de vos données repose sur :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Votre consentement</strong> lors de la création de votre compte</li>
            <li><strong>L'exécution du contrat</strong> (fourniture du service)</li>
            <li><strong>L'intérêt légitime</strong> pour la sécurité et l'amélioration du service</li>
          </ul>
        </section>

        {/* Destinataires */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            5. Destinataires des données
          </h2>
          <p className="mb-4">Vos données personnelles sont accessibles :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>À l'administrateur du site (Cédric RAGOT)</li>
            <li>À l'hébergeur (Vercel Inc.) dans le cadre de l'hébergement technique</li>
            <li>Aux autres utilisateurs pour les données publiques (pseudo, avatar, participations, votes)</li>
          </ul>
          <p className="mt-4">
            <strong className="text-blanc">Nous ne vendons ni ne louons vos données personnelles à des tiers.</strong>
          </p>
        </section>

        {/* Durée de conservation */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            6. Durée de conservation des données
          </h2>
          <p className="mb-4">Vos données personnelles sont conservées :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Données de compte :</strong> Tant que votre compte est actif</li>
            <li><strong>Après suppression du compte :</strong> 30 jours (pour permettre une éventuelle récupération)</li>
            <li><strong>Données de connexion (logs) :</strong> 12 mois maximum (obligation légale)</li>
          </ul>
          <p className="mt-4">
            Passé ces délais, vos données sont supprimées de manière sécurisée et définitive.
          </p>
        </section>

        {/* Sécurité */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">7. Sécurité des données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
            pour protéger vos données personnelles contre :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>L'accès non autorisé</li>
            <li>La perte accidentelle</li>
            <li>La destruction ou l'altération</li>
            <li>La divulgation non autorisée</li>
          </ul>
          <p className="mt-4">
            Les mesures incluent notamment : chiffrement des mots de passe (bcrypt), 
            connexions HTTPS, authentification par JWT, et hébergement sécurisé.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">8. Cookies</h2>
          <p className="mb-4">
            Le site utilise uniquement des <strong className="text-blanc">cookies essentiels</strong> 
            au fonctionnement du service :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Cookie de session :</strong> Pour maintenir votre connexion (JWT token)</li>
          </ul>
          <p className="mt-4">
            <strong className="text-blanc">Nous n'utilisons pas de cookies de tracking ou publicitaires.</strong>
          </p>
        </section>

        {/* Liens externes */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">9. Liens externes (YouTube)</h2>
          <p className="mb-4">
            Les utilisateurs peuvent partager des liens YouTube dans leurs participations. 
            Lorsque vous visionnez ces vidéos, vous êtes soumis à la politique de 
            confidentialité de YouTube/Google.
          </p>
          <p>
            Nous vous recommandons de consulter leur politique :{" "}
            <a 
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-cta transition-colors underline"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </section>

        {/* Transferts internationaux */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            10. Transferts de données hors UE
          </h2>
          <p className="mb-4">
            Vos données sont hébergées par Vercel Inc., dont les serveurs peuvent être 
            situés dans l'Union Européenne ou aux États-Unis.
          </p>
          <p>
            Vercel est conforme au RGPD et utilise des clauses contractuelles types 
            approuvées par la Commission Européenne pour garantir un niveau de protection 
            adéquat de vos données.
          </p>
        </section>

        {/* Droits des utilisateurs */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">11. Vos droits</h2>
          <p className="mb-4">
            Conformément au RGPD, vous disposez des droits suivants concernant vos données 
            personnelles :
          </p>
          
          <ul className="list-none space-y-3 ml-4">
            <li>
              <strong className="text-secondary">✓ Droit d'accès :</strong> Obtenir une copie 
              de vos données personnelles
            </li>
            <li>
              <strong className="text-secondary">✓ Droit de rectification :</strong> Corriger 
              vos données inexactes ou incomplètes
            </li>
            <li>
              <strong className="text-secondary">✓ Droit à l'effacement :</strong> Demander la 
              suppression de vos données
            </li>
            <li>
              <strong className="text-secondary">✓ Droit à la limitation :</strong> Limiter le 
              traitement de vos données
            </li>
            <li>
              <strong className="text-secondary">✓ Droit à la portabilité :</strong> Recevoir 
              vos données dans un format structuré
            </li>
            <li>
              <strong className="text-secondary">✓ Droit d'opposition :</strong> Vous opposer 
              au traitement de vos données
            </li>
            <li>
              <strong className="text-secondary">✓ Droit de retirer votre consentement :</strong> À 
              tout moment
            </li>
          </ul>

          <p className="mt-6">
            Pour exercer ces droits, contactez-nous à :{" "}
            <a 
              href="mailto:cedric.ragot.paris@gmail.com"
              className="text-secondary hover:text-cta transition-colors underline"
            >
              cedric.ragot.paris@gmail.com
            </a>
          </p>
          <p className="mt-4 text-sm">
            Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum.
          </p>
        </section>

        {/* Réclamation */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            12. Droit de réclamation
          </h2>
          <p className="mb-4">
            Si vous estimez que vos droits ne sont pas respectés, vous avez le droit 
            d'introduire une réclamation auprès de la CNIL (Commission Nationale de 
            l'Informatique et des Libertés) :
          </p>
          <ul className="list-none space-y-1 ml-4">
            <li><strong>Site web :</strong>{" "}
              <a 
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-cta transition-colors underline"
              >
                www.cnil.fr
              </a>
            </li>
            <li><strong>Adresse :</strong> 3 Place de Fontenoy, TSA 80715, 75334 PARIS CEDEX 07</li>
            <li><strong>Téléphone :</strong> 01 53 73 22 22</li>
          </ul>
        </section>

        {/* Modifications */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            13. Modifications de la politique
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à 
            tout moment. Les modifications seront publiées sur cette page avec une nouvelle 
            date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-primary/30 pt-6">
          <h2 className="text-2xl font-bold text-cta mb-4">14. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou le 
            traitement de vos données personnelles, vous pouvez nous contacter à :{" "}
            <a 
              href="mailto:cedric.ragot.paris@gmail.com"
              className="text-secondary hover:text-cta transition-colors underline"
            >
              cedric.ragot.paris@gmail.com
            </a>
          </p>
        </section>

        {/* Date de mise à jour */}
        <section className="text-sm text-gray-500 border-t border-primary/30 pt-4">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </section>
      </div>
    </div>
  );
}
