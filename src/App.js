import React from 'react';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as theme} from '@eva-design/eva';
import RootNavigation from './navigator';
import {RootProvider} from './context';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <RootProvider>
        <RootNavigation />
      </RootProvider>
    </ApplicationProvider>
  </>
);

export default App;
