import { CreateMessageInput } from './create-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  userId: string;
}
