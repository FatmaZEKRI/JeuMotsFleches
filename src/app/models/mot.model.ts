export class Mot {
  public mot: string;
  public definition: string;

  constructor(mot: string = null, definition: string = null) {
    this.mot = mot;
    this.definition = definition;
  }

   deserialize(input: any): this {
    Object.assign(this, input);
    return this;
   }
   setDefinition(d: string) {
     this.definition = d;
   }
   setMot(m: string) {
     this.mot = m;
   }
}
