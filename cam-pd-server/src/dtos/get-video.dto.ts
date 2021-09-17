import { IsString } from 'class-validator';

class GetVideoDto {
  @IsString({ message: '잘못된 요청이에요' })
  public uuid!: string;
}

export default GetVideoDto;
