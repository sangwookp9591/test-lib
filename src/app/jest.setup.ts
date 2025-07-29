import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from './shared/api/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
