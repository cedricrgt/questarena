export default function LegalPage() {
  return (
    <div className="min-h-screen bg-noir text-blanc p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-secondary mb-8 font-logo">
        Mentions Légales
      </h1>

      <div className="space-y-8 text-gray-300">
        {/* Éditeur du site */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">1. Éditeur du site</h2>
          <p className="mb-2">
            Le site <strong className="text-blanc">GamerChallenges</strong> est édité par :
          </p>
          <ul className="list-none space-y-1 ml-4">
            <li><strong>Nom :</strong> Cédric RAGOT</li>
            <li><strong>Statut :</strong> Particulier</li>
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

        {/* Directeur de publication */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            2. Directeur de la publication
          </h2>
          <p>
            Le directeur de la publication du site est <strong className="text-blanc">Cédric RAGOT</strong>.
          </p>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">3. Hébergement</h2>
          <p className="mb-2">Le site est hébergé par :</p>
          <ul className="list-none space-y-1 ml-4">
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
            <li><strong>Site web :</strong>{" "}
              <a 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-cta transition-colors underline"
              >
                https://vercel.com
              </a>
            </li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            4. Propriété intellectuelle
          </h2>
          <p className="mb-4">
            L'ensemble du contenu de ce site (structure, textes, logos, images, vidéos, etc.) 
            est la propriété exclusive de Cédric RAGOT, sauf mention contraire.
          </p>
          <p className="mb-4">
            Toute reproduction, distribution, modification, adaptation, retransmission ou 
            publication de ces différents éléments est strictement interdite sans l'accord 
            exprès par écrit de Cédric RAGOT.
          </p>
          <p>
            Les contenus générés par les utilisateurs (participations, commentaires, etc.) 
            restent la propriété de leurs auteurs respectifs.
          </p>
        </section>

        {/* Limitation de responsabilité */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            5. Limitation de responsabilité
          </h2>
          <p className="mb-4">
            Cédric RAGOT s'efforce d'assurer au mieux l'exactitude et la mise à jour des 
            informations diffusées sur ce site, dont il se réserve le droit de corriger le 
            contenu à tout moment et sans préavis.
          </p>
          <p className="mb-4">
            Toutefois, Cédric RAGOT ne peut garantir l'exactitude, la précision ou 
            l'exhaustivité des informations mises à disposition sur ce site.
          </p>
          <p>
            En conséquence, Cédric RAGOT décline toute responsabilité pour toute 
            imprécision, inexactitude ou omission portant sur des informations disponibles 
            sur ce site.
          </p>
        </section>

        {/* Liens externes */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">6. Liens externes</h2>
          <p className="mb-4">
            Le site peut contenir des liens vers des sites externes (notamment YouTube pour 
            les vidéos de participations). Cédric RAGOT n'exerce aucun contrôle sur ces 
            sites et décline toute responsabilité quant à leur contenu.
          </p>
          <p>
            L'existence d'un lien vers un autre site ne constitue pas une validation de ce 
            site ou de son contenu.
          </p>
        </section>

        {/* Droit applicable */}
        <section>
          <h2 className="text-2xl font-bold text-cta mb-4">
            7. Droit applicable et juridiction
          </h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de 
            litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux 
            français conformément aux règles de compétence en vigueur.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-primary/30 pt-6">
          <h2 className="text-2xl font-bold text-cta mb-4">8. Contact</h2>
          <p>
            Pour toute question concernant les mentions légales, vous pouvez nous contacter à l'adresse :{" "}
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
