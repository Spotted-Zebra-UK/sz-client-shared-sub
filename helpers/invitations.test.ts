import * as invitations from './invitations';

describe('invitations', () => {
  describe('parseInvitationToken', () => {
    it('should return undefined if provided url search string without query inv param', () => {
      const urlSearchStringWithoutInv = '?query_param=123';

      expect(
        invitations.parseInvitationToken(urlSearchStringWithoutInv)
      ).toBeUndefined();
    });

    it('should return undefined if provided url search string with bad jwt invitation token', () => {
      const urlSearchStringWithBadInv =
        '?inv=bad-inv-tokeneyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGF0aW9uRGF0YSI6eyJmaXJzdE';

      expect(
        invitations.parseInvitationToken(urlSearchStringWithBadInv)
      ).toBeUndefined();
    });

    it('should return invitation data', () => {
      const urlSearchStringWithInv =
        '?inv=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGF0aW9uRGF0YSI6eyJmaXJzdE5hbWUiOiJNYXJrbyIsImxhc3ROYW1lIjoiTGp1YmljIiwiZW1haWwiOiJtYXJrby5sanViaWNAc3BvdHRlZHplYnJhLmNvLnVrIn0sImlhdCI6MTYwMTkzMDA3Mn0.siJi95iSrtFPowW0X9Y3wdwt1FLCo8RoLpTdWDNb9Jo';

      expect(invitations.parseInvitationToken(urlSearchStringWithInv)).toEqual({
        candidateData: {
          email: 'marko.ljubic@spottedzebra.co.uk',
          fullName: 'Marko Ljubic',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGF0aW9uRGF0YSI6eyJmaXJzdE5hbWUiOiJNYXJrbyIsImxhc3ROYW1lIjoiTGp1YmljIiwiZW1haWwiOiJtYXJrby5sanViaWNAc3BvdHRlZHplYnJhLmNvLnVrIn0sImlhdCI6MTYwMTkzMDA3Mn0.siJi95iSrtFPowW0X9Y3wdwt1FLCo8RoLpTdWDNb9Jo',
      });
    });
  });
});
