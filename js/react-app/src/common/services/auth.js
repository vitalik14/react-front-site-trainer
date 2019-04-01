import { create } from '../httpClient';

export default content => create('/register', content);
