import { MaxiNElectronPage } from './app.po';

describe('maxi-n-electron App', () => {
  let page: MaxiNElectronPage;

  beforeEach(() => {
    page = new MaxiNElectronPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
