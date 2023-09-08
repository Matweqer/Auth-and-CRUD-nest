import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'cyrillic', async: false })
class CyrillicValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return !/[а-яА-ЯЁё]/.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} should not contains cyrillic`;
  }
}

export function NotContainsCyrillic(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'notContainsCyrillic',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: CyrillicValidator,
    });
  };
}
