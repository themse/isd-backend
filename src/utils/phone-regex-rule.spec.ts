import { phoneRegExp } from './phone-regex-rule';

describe('phoneRegExp', () => {
  const mockPhones = [
    '+61 1 2345 6789',
    '01 2345 6789',
    '01-2345-6789',
    '(01) 2345 6789',
    '(01) 2345-6789',
  ];

  const regex = new RegExp(phoneRegExp);

  it('Check regexp with a list of rules', () => {
    mockPhones.forEach((phoneNumber) => {
      expect(regex.test(phoneNumber)).toBeTruthy();
    });
  });
});
