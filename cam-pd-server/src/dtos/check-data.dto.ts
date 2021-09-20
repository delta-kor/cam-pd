import { IsObject, IsString } from 'class-validator';

class CheckDataDto {
  @IsString({ message: '채점을 실패했어요\n나중에 다시 시도해주세요' })
  uuid!: string;

  @IsObject({ message: '채점을 실패했어요\n나중에 다시 시도해주세요' })
  data!: InputData;
}

export default CheckDataDto;
