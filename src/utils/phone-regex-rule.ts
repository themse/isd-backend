/*
  Phone number Reg exp rules
  
  Examples:
    +61 1 2345 6789
    01 2345 6789
    01-2345-6789
    (01) 2345 6789
    (01) 2345-6789
*/
export const phoneRegExp =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
