import { Mot } from './../models/mot.model';
import { TestBed } from '@angular/core/testing';
import { MotService } from './mot.service';

describe('MotService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({}));
  let m = new Mot('été', 'saison chaude');
  let n = new Mot('sens', 'direction');
  let x = new Mot('reussite', 'succes');

  it('should be created', () => {
    const service: MotService = TestBed.get(MotService);
    service.ajouterNouvMot(m);
    service.ajouterNouvMot(n);
    service.ajouterNouvMot(x);
    expect(service).toBeTruthy();
  });
  it('should be created', (done) => {
    const service: MotService = TestBed.get(MotService);
    let result;
    service.getMot(0).then(
      (data) => {
        result = data;
        expect(result).toEqual(m);
        //console.log(result);
        done();
      },
      (err) => {
        console.error(err);
      }
    );

  });
});
