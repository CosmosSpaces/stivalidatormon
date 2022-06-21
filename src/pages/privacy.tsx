import React from 'react';

import { Main } from '../templates/main';

const Privacy = () => {
  const [url, setUrl] = React.useState('');
  React.useEffect(() => {
    setUrl(window.location.origin);
  }, []);
  return (
    <Main>
      <header className="mx-12 pt-8 pb-0">
        <h1 className="text-2xl font-semibold text-cyan-400 mb-10">
          {' '}
          Privacy Policy{' '}
        </h1>
      </header>
      <section className="mx-12 pb-8 text-white text-sm">
        <p className="mb-2">
          Cosmo Spaces operates the {url} website, which provides the SERVICE.
        </p>
        <p className="mb-2">
          This page is used to inform website visitors regarding our policies
          with the collection, use, and disclosure of Personal Information if
          anyone decided to use our Service, the Cosmos Spaces Valmon website.
          If you choose to use our Service, then you agree to the collection and
          use of information in relation with this policy. We currently
          don&apos;t collect any information. In the future we might check
          analytics for traffic data but that currently isn&apos;t implemented.
        </p>
      </section>
      <section className="mx-12 pb-8 text-white text-sm">
        <h2 className="text-md text-cyan-400 font-semibold mb-2">
          Information Collection and Use
        </h2>

        <p className="mb-2">We will never collect personal information.</p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">Log Data</h2>

        <p className="mb-2">
          We want to inform you that whenever you visit our Service, we collect
          information that your browser sends to us that is called Log Data.
          This Log Data may include information such as your computer&apos;s
          Internet Protocol (&quot;IP&quot;) address, browser version, pages of
          our Service that you visit, the time and date of your visit, the time
          spent on those pages, and other statistics. This is only used in order
          to determine overall usage of the application. This currently
          isn&apos;t in place so no log data is being tracked.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">Cookies</h2>

        <p className="mb-2">
          Cookies are files with small amount of data that is commonly used an
          anonymous unique identifier. These are sent to your browser from the
          website that you visit and are stored on your computer&apos;s hard
          drive.
        </p>

        <p className="mb-2">
          Our website will never create or use cookies. We are not cookie
          monsters.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">
          Service Providers
        </h2>

        <p className="mb-2">
          We may employ third-party companies and individuals due to the
          following reasons:
        </p>

        <ul className="list-disc">
          <li>To facilitate our Service;</li>
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>

        <p className="mb-2">
          We will never share your personal information with any third party.
          Mainly because we don&apos;t collect any and also we&apos;re not evil.
          Regardless, we have no data to sell so this is not a concern for our
          users.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">Security</h2>

        <p className="mb-2">
          We value your trust which is why we don&apos;t collect any data.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">
          Links to Other Sites
        </h2>

        <p className="mb-2">
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over, and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">
          Children&apos;s Privacy
        </h2>

        <p className="mb-2">
          Our Services do not address anyone under the age of 13. We do not
          knowingly collect personal identifiable information from children
          under 13. In the case we discover that a child under 13 has provided
          us with personal information, we immediately delete this from our
          servers (though we don&apos;t even have a server so this isn&apos;t a
          problem). If you are a parent or guardian and you are aware that your
          child has provided us with personal information, please contact us so
          that we will be able to do necessary actions.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>

        <p className="mb-2">
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </p>

        <h2 className="text-md text-cyan-400 font-semibold mb-2">Contact Us</h2>

        <p>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at{' '}
          <a href="mailto:cosmosspacesdev@gmail.com">
            cosmosspacesdev@gmail.com
          </a>
          .
        </p>
      </section>
    </Main>
  );
};

export default Privacy;
