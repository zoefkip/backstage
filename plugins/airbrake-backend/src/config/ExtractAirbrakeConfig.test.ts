/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ConfigReader } from '@backstage/config';
import { extractAirbrakeConfig } from './ExtractAirbrakeConfig';

describe('ExtractAirbrakeConfig', () => {
  let oldProcessEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    oldProcessEnv = process.env;
  });

  it('gets the API key', () => {
    const config = new ConfigReader({
      airbrake: {
        apiKey: 'fakeApiKey',
      },
    });

    const airbrakeConfig = extractAirbrakeConfig(config);
    expect(airbrakeConfig.apiKey).toStrictEqual('fakeApiKey');
  });

  it('does not fail in development', () => {
    process.env = {
      ...oldProcessEnv,
      NODE_ENV: 'development',
    };

    const config = new ConfigReader({});

    expect(() => extractAirbrakeConfig(config)).not.toThrow();
    const airbrakeConfig = extractAirbrakeConfig(config);
    expect(airbrakeConfig.apiKey).toStrictEqual('');
  });

  it('fails in production', () => {
    process.env = {
      ...oldProcessEnv,
      NODE_ENV: 'production',
    };

    const config = new ConfigReader({});
    expect(() => extractAirbrakeConfig(config)).toThrow();
  });

  afterEach(() => {
    process.env = { ...oldProcessEnv };
  });
});
