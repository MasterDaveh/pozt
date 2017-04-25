import { PoztPage } from './app.po';

describe('pozt App', () => {
  let page: PoztPage;

  beforeEach(() => {
    page = new PoztPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
