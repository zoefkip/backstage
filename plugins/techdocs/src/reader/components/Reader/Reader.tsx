/*
 * Copyright 2020 The Backstage Authors
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

import React, { PropsWithChildren } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { EntityName } from '@backstage/catalog-model';

import { useTechDocsPage } from '../TechDocsPage';
import { TechDocsSearch } from '../TechDocsSearch';
import { TechDocsStateIndicator } from '../TechDocsStateIndicator';

import { useTechDocsReader, TechDocsReaderProvider } from './context';

const useStyles = makeStyles(() => ({
  searchBar: {
    marginLeft: 'calc(16rem + 1.2rem)',
    maxWidth: 'calc(100% - 16rem * 2 - 2.4rem)',
    '@media screen and (max-width: 76.1875em)': {
      marginLeft: 'calc(10rem + 0.8rem)',
      maxWidth: 'calc(100% - 10rem - 1.6rem)',
    },
  },
}));

type TechDocsReaderPageProps = PropsWithChildren<{
  withSearch?: boolean;
}>;

const TechDocsReaderPage = ({
  withSearch: search = true,
  children,
}: TechDocsReaderPageProps) => {
  const classes = useStyles();
  const { isReady } = useTechDocsPage();
  const { content, entityName: entityId } = useTechDocsReader();

  return (
    <Grid container>
      <Grid xs={12} item>
        <TechDocsStateIndicator />
      </Grid>
      {isReady && search && (
        <Grid className={classes.searchBar} xs={12} item>
          <TechDocsSearch entityId={entityId} />
        </Grid>
      )}
      {content && (
        <Grid xs={12} item>
          {children}
        </Grid>
      )}
    </Grid>
  );
};

type ReaderProps = TechDocsReaderPageProps & {
  entityRef: EntityName;
  onReady?: () => void;
};

export const Reader = ({
  entityRef,
  onReady = () => {},
  ...rest
}: ReaderProps) => (
  <TechDocsReaderProvider entityName={entityRef} onReady={onReady}>
    <TechDocsReaderPage {...rest} />
  </TechDocsReaderProvider>
);
