import validate from './validate';

describe('validate', () => {
  describe('nonEmptyStringValidator', () => {
    it('should return an error for invalid strings', () => {
      const errorCases = [1, null, undefined, {}, [1, 2], true, false, '   '];

      errorCases.forEach(inputVar => {
        const errors = validate(
          { stringField: inputVar },
          {
            stringField: {
              nonEmptyString: true,
            },
          }
        );
        expect(errors.stringField).toEqual([
          'String field must be a non empty string',
        ]);
      });
    });

    it('should return an error for invalid strings when allowEmpty is TRUE', () => {
      const errorCases = [1, {}, [1, 2], true, false, '   '];

      errorCases.forEach(inputVar => {
        const errors = validate(
          { stringField: inputVar },
          {
            stringField: {
              nonEmptyString: {
                allowEmpty: true,
                message: 'custom message',
              },
            },
          }
        );
        expect(errors.stringField).toEqual(['String field custom message']);
      });
    });

    it('should pass the validation when valid string provided', () => {
      const errors = validate(
        { stringField: 'string' },
        {
          stringField: {
            nonEmptyString: true,
          },
        }
      );

      expect(errors).toBeUndefined();
    });

    it('should pass the validation when valid string provided when allowEmpty is TRUE', () => {
      const errors = validate(
        { stringField: '' },
        {
          stringField: {
            nonEmptyString: {
              allowEmpty: true,
              message: 'custom message',
            },
          },
        }
      );

      expect(errors).toBeUndefined();
    });
  });
});
