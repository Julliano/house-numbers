describe('env vars', () => {
  it('REMIX_API_URL is defined', () => {
    console.log('process.env', process.env)
    expect(process.env.REMIX_API_URL).toBeDefined();
  });
});
