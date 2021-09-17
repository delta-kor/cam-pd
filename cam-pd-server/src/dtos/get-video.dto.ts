import { IsString } from 'class-validator';

class GetVideoDto {
  @IsString()
  public uuid!: string;
}

export default GetVideoDto;
