import { Equals, IsString } from 'class-validator';
import dotenv from 'dotenv';
import IsNotBlank from '../decorators/notblank.decorator';

dotenv.config();

class CreateStageDto {
  @IsNotBlank()
  @Equals(process.env.SECRET, { message: '비밀키를 입력해주세요' })
  public secret!: string;

  @IsString()
  @IsNotBlank()
  public title!: string;

  @IsString()
  @IsNotBlank()
  public concert!: string;

  @IsString()
  @IsNotBlank()
  public video_id!: string;
}

export default CreateStageDto;
