import {
  CogIcon,
  HeartIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from '@heroicons/react/outline';

import { Main } from '../templates/main';

const features = [
  {
    name: 'Purpose',
    description:
      'This is a simple application for operators of validators to watch their collection of validators across multiple chains, in a one screen snapshot using open chain information, unless the "view secure info" switch is toggled. That will required whitelisting who can see that additional information on the validator itself.',
    icon: TerminalIcon,
  },
  {
    name: 'Join',
    description:
      'A team dedicated to the educations, technical, community building of the Cosmos Ecosystem.',
    icon: RefreshIcon,
  },
  {
    name: 'Support Cosmos',
    description:
      'Our mission of education, technology, and community building can only be furthered with the help of the community. From participating in our spaces, to, kind words, and delegation to our validators. You choose what works for you! Further info for these things is available here: <a href="https://linktr.ee/Cosmostwitterspaces">https://linktr.ee/Cosmostwitterspaces</a>',
    icon: HeartIcon,
  },
  {
    name: 'Privacy',
    description:
      'This application collects no personal information at any time. It is a simple block explorer.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Developers',
    description:
      'A collaboration from the minds of Freddie Mixell & Marty Schoffstall.',
    icon: CogIcon,
  },
  {
    name: 'Thanks',
    description:
      'Special thanks to the Cosmos ecosystem and all the developers who have helped by figuring out how to work with this open block data.',
    icon: ServerIcon,
  },
  {
    name: 'Coming Soon',
    description:
      "Alpha version v1.0 projected for July of 2022. What you're currently viewing is a beta version.",
    icon: ServerIcon,
  },
];

export default function Info() {
  return (
    <Main normalHeader>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center mt-12 mb-16">
          {features.map((feature) => (
            <div key={feature.name} className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                    {feature.name}
                  </h3>
                  <p
                    className="mt-5 text-base text-gray-500"
                    dangerouslySetInnerHTML={{ __html: feature.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
}
