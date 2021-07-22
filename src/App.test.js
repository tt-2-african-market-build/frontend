
import '@testing-library/jest-dom';




//this tests ensures that the header is rendered
test('Header is rendered', () => {
  expect(document.querySelector('header')).toBeTruthy();
} 
);


