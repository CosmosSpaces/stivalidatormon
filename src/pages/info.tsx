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
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: TerminalIcon,
  },
  {
    name: 'Support Cosmos',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: HeartIcon,
  },
  {
    name: 'Join',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: RefreshIcon,
  },
  {
    name: 'Privacy',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Developers',
    description:
      'A collaboration from the minds of Marty Schoffstall & Freddie Mixell.',
    icon: CogIcon,
  },
  {
    name: 'Thanks',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
  {
    name: 'Coming Soon',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
];

export default function Info() {
  return (
    <Main>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center mt-12 mx-12">
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
                <p className="mt-5 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}
