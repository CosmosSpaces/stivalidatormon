import React, { useEffect, useState } from 'react';

import ClockLoader from 'react-spinners/ClockLoader';

import { Button } from '../components/elements';
import { usePollingInterval } from '../lib/storage';
import { Main } from '../templates/main';

const SaveOverlay = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full z-40 bg-purple-500 bg-opacity-80 flex flex-col h-full w-full text-center justify-center items-center">
      <p className="text-white mb-2">Saving...</p>
      <ClockLoader size={25} color="white" />
    </div>
  );
};

const Settings = () => {
  const { pollingInterval, setPollingInterval } = usePollingInterval();
  const [localInterval, setLocalInterval] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!localInterval && pollingInterval && !init) {
      setLocalInterval(pollingInterval);
      setInit(true);
    }
  }, [pollingInterval, localInterval, init]);
  return (
    <Main>
      {saving ? <SaveOverlay /> : null}
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-1/2 px-3 mb-5">
            <p className="text-white text-xl">Settings</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            className="flex flex-col"
            style={{ height: '80vh' }}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setTimeout(() => {
                setSaving(false);
              }, 500);
              if (!localInterval) {
                // eslint-disable-next-line no-console
                console.error(
                  `Polling Interval ${localInterval} is too short.`
                );
                return;
              }
              if (localInterval >= 30000) {
                setPollingInterval(localInterval);
              } else {
                // eslint-disable-next-line no-console
                console.error(
                  `Polling Interval ${localInterval} is too short.`
                );
              }
            }}
          >
            <div className="w-1/2 px-3 mb-5">
              <label
                htmlFor=""
                className="text-xs text-white font-semibold px-1"
              >
                Poll Interval (milliseconds)
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <span className="material-icons">schedule</span>
                </div>
                <input
                  type="number"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder={'Enter an interval'}
                  value={localInterval ?? 0}
                  onChange={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                      setLocalInterval(parseInt(event.target.value || '0', 10));
                    }
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 px-3 mb-5">
              <Button type="submit" onClick={() => setSaving(true)}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default Settings;
