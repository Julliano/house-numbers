describe('env vars', () => {
  it('REMIX_API_URL is defined', () => {
    expect(process.env.REMIX_API_URL).toBeDefined();
  });
});
