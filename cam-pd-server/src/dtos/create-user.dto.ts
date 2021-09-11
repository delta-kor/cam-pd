import { IsString, Matches, MaxLength } from 'class-validator';
import IsNotBlank from '../decorators/notblank.decorator';

class CreateUserDto {
  @IsString({ message: '닉네임을 입력해주세요' })
  @IsNotBlank({ message: '닉네임을 입력해주세요' })
  @MaxLength(12, { message: '닉네임은 12자 이내로 입력해주세요' })
  @Matches(/^[ㅏ-ㅣㄱ-ㅎ가-힣a-zA-Z0-9 *]+$/g, {
    message: '한글, 영어, 숫자만 입력 가능해요',
  })
  public nickname!: string;
}

export default CreateUserDto;
