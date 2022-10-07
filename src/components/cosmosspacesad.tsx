import React, { useState, useEffect } from 'react';

const CosmosSpacesAd = () => {
  const [iframeUrl, setIFrame] = useState('');
  useEffect(() => {
    const run = async () => {
      try {
        const req = await fetch('http://app.gmosher.org:8080/adurl', {
          method: 'GET',
        });
        const res: { url: string } = await req.json();
        if (!res?.url) throw new Error('Response should be {url: string}');
        setIFrame(res.url);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        } else {
          console.error(e);
        }
        setIFrame(
          `https://assets-gmosher.s3.us-east-2.amazonaws.com/ad_defaultcs.html`
        );
      }
    };
    run();
  }, []);
  if (iframeUrl.length !== 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
        <iframe width="1000" src={iframeUrl} />
      </div>
    );
  }
  /* Didn't get a sponsor ad back so just show the stock brag */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-purple-300 border border-blacks rounded-2xl">
        <div className="px-8 py-5 flex justify-between items-center">
          <p className="text-white font-semibold text-xl text-center">
            Sponsored by Cosmos Spaces
            <br />
            <span className="text-xs">Community | Support | Alpha</span>
          </p>
          <img
            src="/assets/images/logo.png"
            width="100"
            alt="Cosmos Spaces logo"
          />
        </div>
      </div>
    </div>
  );
};

export default CosmosSpacesAd;
