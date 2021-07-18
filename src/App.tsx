import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './views/Home';
import { Nav } from './components/Nav';
import { Container } from './components/Container';
import { Main } from './components/Main';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Container>
          <Nav />
          <Main>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Main>
        </Container>
      </Router>
      <ReactQueryDevtools position="bottom-left" />
    </QueryClientProvider>
  );
};

export default App;
