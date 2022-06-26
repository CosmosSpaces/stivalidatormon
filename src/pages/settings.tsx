/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';

import ClockLoader from 'react-spinners/ClockLoader';

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
  const [editingSettings, setEditingSettings] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!localInterval && pollingInterval && !init) {
      setLocalInterval(pollingInterval);
      setInit(true);
    }
  }, [pollingInterval, localInterval, init]);
  return (
    <Main normalHeader>
      {saving ? <SaveOverlay /> : null}
      <div className="py-8 bg-purple-300 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-purple-300">
          <div>
            <div className="md:flex md:items-center md:justify-between bg-purple-300">
              <div className=" min-w-0">
                <h2 className="text-2xl font-semibold leading-7 text-white sm:text-3xl">
                  Settings
                </h2>
              </div>
              <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setEditingSettings(!editingSettings)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={!editingSettings}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  onClick={() => {
                    setSaving(true);
                    setTimeout(() => {
                      setSaving(false);
                      setEditingSettings(false);
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
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col" style={{ height: '50vh' }}>
            <div className="w-full md:w-1/2 mb-5">
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
                  disabled={!editingSettings}
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
            <div className="w-full md:w-1/2 mt-auto mb-5">
              <div className="bg-purple-500 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-white">
                    Reset settings
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-white">
                    <p>
                      Once you reset validators, you will have to manually add
                      back the ones you want to track. You&apos;ll also need to
                      re-adjust polling interval.
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      onClick={() => {
                        // eslint-disable-next-line no-restricted-globals
                        const response = confirm(
                          'Are you sure you want to reset?'
                        );
                        if (response === true) {
                          localStorage.clear();
                          window.location.href = window.location.origin;
                        }
                      }}
                    >
                      Reset settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Settings;
