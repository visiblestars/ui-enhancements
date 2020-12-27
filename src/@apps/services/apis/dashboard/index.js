import mock from '../../MockConfig';
import ecommerce from '../../db/dashboard/ecommerce';
// Define all mocks of dashboard

mock.onGet('/dashboard/ecommerce').reply(200, ecommerce);
