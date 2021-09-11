import { registerDecorator, ValidationOptions } from 'class-validator';

function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0;
        },
        defaultMessage(): string {
          return `${propertyName} must not be blank`;
        },
      },
    });
  };
}

export default IsNotBlank;
