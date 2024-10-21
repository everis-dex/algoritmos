import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  @Input()
  public image: string = 'https://s3-alpha-sig.figma.com/img/66f1/ebee/92bbd6c6311f77d2c3481e6014504b03?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=myM5o-f7PKXZ0lJXe8GUGpSUjVarzjUqE0m28M~aiYVFt6344YfFXJcf~pcOjFYtDKZf1tDuF-CNaFap9ox-qsL~RM9Y4cJZDik1xQIMkOHlR2RWfDBh2AcsLWY83q-byqI2UHyy1K90HwlyUWEhv-Blzr1XEKZS3ks7r8yW~cmQfbIFhNh~SJLhh3i~c4FJwX0yifemYLJf497-e64Fod-ky63rEA1tABIHpZ72VbxXaFIxh1zvBJGWVhpruvJNnAPqqGNJfeyT~f08aqRJmNO9d1MG~OTsW-kACbP1vqWIFEnoAtLCjb-Ku0xWNhyJKLKGlMzIqSLJuNj5wwj6oA__';
  @Input()
  public title: string = "Què és un sistema d'IA?";
  @Input()
  public body: string = 'La intel·ligència artificial és una disciplina de la informàtica, dedicada al desenvolupament d’algorismes, que permet que les màquines prenguin decisions intel·ligents';
  @Input()
  public url: string = 'https://administraciodigital.gencat.cat/ca/inici/';
}
