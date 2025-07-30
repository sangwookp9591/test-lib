import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from '../shared/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
