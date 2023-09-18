import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private ProductsAll: Product[] = []
  private productsObs = new BehaviorSubject<Product[]>(this.ProductsAll);
  
  private products: Product[] = [
    {
      name: 'Miód Wielokwiatowy 1L',
      price: new FormControl(50),
      description: 'Miód wielokwiatowy to prawdziwe dzieło natury, w którym zanurzają się bogactwo barw, zapachów i smaków. Zbierany przez pszczoły z nektaru różnych kwiatów, tworzy harmonijną mieszankę, którajest wyrazem różnorodności otaczającej przyrody. Każde słoiczek tego miodu przenosi w sobie historię zbiorów z różnych pór roku i obszarów, co nadaje mu niepowtarzalny charakter. Smak miodu wielokwiatowego jest zaskakująco zróżnicowany. W jednym łyżeczce można odkryć nuty słodkie, owocowe, a nawet lekko pikantne. Jest to owoc współpracy wielu roślin, które razem tworzą paletę smakową nie do podrobienia.' ,
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Wielokwiatowy 2L',
      price: new FormControl(95),
      description: 'Miód wielokwiatowy to prawdziwe dzieło natury, w którym zanurzają się bogactwo barw, zapachów i smaków. Zbierany przez pszczoły z nektaru różnych kwiatów, tworzy harmonijną mieszankę, którajest wyrazem różnorodności otaczającej przyrody. Każde słoiczek tego miodu przenosi w sobie historię zbiorów z różnych pór roku i obszarów, co nadaje mu niepowtarzalny charakter. Smak miodu wielokwiatowego jest zaskakująco zróżnicowany. W jednym łyżeczce można odkryć nuty słodkie, owocowe, a nawet lekko pikantne. Jest to owoc współpracy wielu roślin, które razem tworzą paletę smakową nie do podrobienia.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Klasyczny 1L',
      price: new FormControl(60),
      description: 'Miód klasyczny to esencja natury zamknięta w jednym słodkim nectarium. Zebrany starannie przez pszczół nektar z kwiatów przekształca się w płynny skarb o złocistej barwie, która przypomina ciepłe promienie słońca. Jego smak jest wyjątkowo delikatny i równowagi pomiędzy słodkim a subtelnie kwiatowym, co sprawia, że jest on nie tylko doskonałym dodatkiem do potraw, ale również pysznym słodkim przysmakiem spożywanym samodzielnie. Miód klasyczny posiada wiele właściwości zdrowotnych. Jest źródłem naturalnych enzymów, antyoksydantów oraz mikroelementów, które mogą wspomagać układ odpornościowy organizmu oraz działać korzystnie na przewód pokarmowy. Posiada także właściwości przeciwzapalne i antybakteryjne, co sprawia, że jest często stosowany jako naturalny środek na dolegliwości gardła czy infekcje.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Klasyczny 2L',
      price: new FormControl(115),
      description: 'Miód klasyczny to esencja natury zamknięta w jednym słodkim nectarium. Zebrany starannie przez pszczół nektar z kwiatów przekształca się w płynny skarb o złocistej barwie, która przypomina ciepłe promienie słońca. Jego smak jest wyjątkowo delikatny i równowagi pomiędzy słodkim a subtelnie kwiatowym, co sprawia, że jest on nie tylko doskonałym dodatkiem do potraw, ale również pysznym słodkim przysmakiem spożywanym samodzielnie. Miód klasyczny posiada wiele właściwości zdrowotnych. Jest źródłem naturalnych enzymów, antyoksydantów oraz mikroelementów, które mogą wspomagać układ odpornościowy organizmu oraz działać korzystnie na przewód pokarmowy. Posiada także właściwości przeciwzapalne i antybakteryjne, co sprawia, że jest często stosowany jako naturalny środek na dolegliwości gardła czy infekcje.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Nawłociowy 1L',
      price: new FormControl(65),
      description: 'Miód nawłociowy to pyszny i aromatyczny rodzaj miodu, który jest pozyskiwany z nektaru kwiatów nawłoci. Nawłoć (Melilotus) to roślina z rodziny bobowatych, charakteryzująca się pięknymi, żółtymi lub białymi kwiatami, które wytwarzają obfity nektar. Miód nawłociowy ma charakterystyczny, delikatny smak o nutach kwiatowych i lekko słodkich akcentach. Miód nawłociowy jest ceniony nie tylko ze względu na swój smak, ale także za swoje potencjalne korzyści dla zdrowia. Może być stosowany jako naturalny środek wspomagający układ trawienny, pomagający w łagodzeniu stanów zapalnych oraz wspierający układ odpornościowy. Ponadto, jego subtelny smak sprawia, że jest doskonałym dodatkiem do różnych potraw i napojów, zarówno na ciepło, jak i na zimno.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Nawłociowy 2L',
      price: new FormControl(125),
      description: 'Miód nawłociowy to pyszny i aromatyczny rodzaj miodu, który jest pozyskiwany z nektaru kwiatów nawłoci. Nawłoć (Melilotus) to roślina z rodziny bobowatych, charakteryzująca się pięknymi, żółtymi lub białymi kwiatami, które wytwarzają obfity nektar. Miód nawłociowy ma charakterystyczny, delikatny smak o nutach kwiatowych i lekko słodkich akcentach. Miód nawłociowy jest ceniony nie tylko ze względu na swój smak, ale także za swoje potencjalne korzyści dla zdrowia. Może być stosowany jako naturalny środek wspomagający układ trawienny, pomagający w łagodzeniu stanów zapalnych oraz wspierający układ odpornościowy. Ponadto, jego subtelny smak sprawia, że jest doskonałym dodatkiem do różnych potraw i napojów, zarówno na ciepło, jak i na zimno.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Lipowy 1L',
      price: new FormControl(50),
      description: 'Miód lipowy to wyjątkowy i ceniony rodzaj miodu, pozyskiwany z nektaru kwiatów lipy (Tilia). Lipa, znana również jako lipowiec, to drzewo lub krzew, które w okresie kwitnienia wytwarza obfite ilości aromatycznego nektaru. Miód lipowy ma charakterystyczny, delikatny smak o wyrazistych nutach kwiatowych oraz lekko miętowych lub miętowo-cytrynowych akcentach. Miód lipowy jest znany z zawartości przeciwzapalnych, antyoksydacyjnych oraz uspokajających składników. Może mieć pozytywny wpływ na układ odpornościowy, układ pokarmowy oraz pomagać w łagodzeniu dolegliwości związanych z gardłem i układem oddechowym. Wspomaga również procesy trawienne i może działać kojąco na nerwy.Ze względu na swój unikalny smak i właściwości zdrowotne, miód lipowy jest często wybierany jako doskonały dodatek do herbaty, napojów, potraw, a także jako naturalny słodzik w kuchni. Jest również ceniony w przemyśle kosmetycznym, gdzie wykorzystuje się go w produktach do pielęgnacji skóry.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Lipowy 2L',
      price: new FormControl(95),
      description: 'Miód lipowy to wyjątkowy i ceniony rodzaj miodu, pozyskiwany z nektaru kwiatów lipy (Tilia). Lipa, znana również jako lipowiec, to drzewo lub krzew, które w okresie kwitnienia wytwarza obfite ilości aromatycznego nektaru. Miód lipowy ma charakterystyczny, delikatny smak o wyrazistych nutach kwiatowych oraz lekko miętowych lub miętowo-cytrynowych akcentach. Miód lipowy jest znany z zawartości przeciwzapalnych, antyoksydacyjnych oraz uspokajających składników. Może mieć pozytywny wpływ na układ odpornościowy, układ pokarmowy oraz pomagać w łagodzeniu dolegliwości związanych z gardłem i układem oddechowym. Wspomaga również procesy trawienne i może działać kojąco na nerwy.Ze względu na swój unikalny smak i właściwości zdrowotne, miód lipowy jest często wybierany jako doskonały dodatek do herbaty, napojów, potraw, a także jako naturalny słodzik w kuchni. Jest również ceniony w przemyśle kosmetycznym, gdzie wykorzystuje się go w produktach do pielęgnacji skóry.',
      quantity: 0,
      status: undefined
    },
    
  ]
  private productsPage: Product[] = [
    {
      name: 'Miód Wielokwiatowy 1L',
      price: new FormControl(50),
      description: 'Miód wielokwiatowy to prawdziwe dzieło natury, w którym zanurzają się bogactwo barw, zapachów i smaków. Zbierany przez pszczoły z nektaru różnych kwiatów, tworzy harmonijną mieszankę, którajest wyrazem różnorodności otaczającej przyrody. Każde słoiczek tego miodu przenosi w sobie historię zbiorów z różnych pór roku i obszarów, co nadaje mu niepowtarzalny charakter. Smak miodu wielokwiatowego jest zaskakująco zróżnicowany. W jednym łyżeczce można odkryć nuty słodkie, owocowe, a nawet lekko pikantne. Jest to owoc współpracy wielu roślin, które razem tworzą paletę smakową nie do podrobienia.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Wielokwiatowy 2L',
      price: new FormControl(95),
      description: 'Miód wielokwiatowy to prawdziwe dzieło natury, w którym zanurzają się bogactwo barw, zapachów i smaków. Zbierany przez pszczoły z nektaru różnych kwiatów, tworzy harmonijną mieszankę, którajest wyrazem różnorodności otaczającej przyrody. Każde słoiczek tego miodu przenosi w sobie historię zbiorów z różnych pór roku i obszarów, co nadaje mu niepowtarzalny charakter. Smak miodu wielokwiatowego jest zaskakująco zróżnicowany. W jednym łyżeczce można odkryć nuty słodkie, owocowe, a nawet lekko pikantne. Jest to owoc współpracy wielu roślin, które razem tworzą paletę smakową nie do podrobienia.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Klasyczny 1L',
      price: new FormControl(60),
      description: 'Miód klasyczny to esencja natury zamknięta w jednym słodkim nectarium. Zebrany starannie przez pszczół nektar z kwiatów przekształca się w płynny skarb o złocistej barwie, która przypomina ciepłe promienie słońca. Jego smak jest wyjątkowo delikatny i równowagi pomiędzy słodkim a subtelnie kwiatowym, co sprawia, że jest on nie tylko doskonałym dodatkiem do potraw, ale również pysznym słodkim przysmakiem spożywanym samodzielnie. Miód klasyczny posiada wiele właściwości zdrowotnych. Jest źródłem naturalnych enzymów, antyoksydantów oraz mikroelementów, które mogą wspomagać układ odpornościowy organizmu oraz działać korzystnie na przewód pokarmowy. Posiada także właściwości przeciwzapalne i antybakteryjne, co sprawia, że jest często stosowany jako naturalny środek na dolegliwości gardła czy infekcje.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Klasyczny 2L',
      price: new FormControl(115),
      description: 'Miód klasyczny to esencja natury zamknięta w jednym słodkim nectarium. Zebrany starannie przez pszczół nektar z kwiatów przekształca się w płynny skarb o złocistej barwie, która przypomina ciepłe promienie słońca. Jego smak jest wyjątkowo delikatny i równowagi pomiędzy słodkim a subtelnie kwiatowym, co sprawia, że jest on nie tylko doskonałym dodatkiem do potraw, ale również pysznym słodkim przysmakiem spożywanym samodzielnie. Miód klasyczny posiada wiele właściwości zdrowotnych. Jest źródłem naturalnych enzymów, antyoksydantów oraz mikroelementów, które mogą wspomagać układ odpornościowy organizmu oraz działać korzystnie na przewód pokarmowy. Posiada także właściwości przeciwzapalne i antybakteryjne, co sprawia, że jest często stosowany jako naturalny środek na dolegliwości gardła czy infekcje.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Nawłociowy 1L',
      price: new FormControl(65),
      description: 'Miód nawłociowy to pyszny i aromatyczny rodzaj miodu, który jest pozyskiwany z nektaru kwiatów nawłoci. Nawłoć (Melilotus) to roślina z rodziny bobowatych, charakteryzująca się pięknymi, żółtymi lub białymi kwiatami, które wytwarzają obfity nektar. Miód nawłociowy ma charakterystyczny, delikatny smak o nutach kwiatowych i lekko słodkich akcentach. Miód nawłociowy jest ceniony nie tylko ze względu na swój smak, ale także za swoje potencjalne korzyści dla zdrowia. Może być stosowany jako naturalny środek wspomagający układ trawienny, pomagający w łagodzeniu stanów zapalnych oraz wspierający układ odpornościowy. Ponadto, jego subtelny smak sprawia, że jest doskonałym dodatkiem do różnych potraw i napojów, zarówno na ciepło, jak i na zimno.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Nawłociowy 2L',
      price: new FormControl(125),
      description: 'Miód nawłociowy to pyszny i aromatyczny rodzaj miodu, który jest pozyskiwany z nektaru kwiatów nawłoci. Nawłoć (Melilotus) to roślina z rodziny bobowatych, charakteryzująca się pięknymi, żółtymi lub białymi kwiatami, które wytwarzają obfity nektar. Miód nawłociowy ma charakterystyczny, delikatny smak o nutach kwiatowych i lekko słodkich akcentach. Miód nawłociowy jest ceniony nie tylko ze względu na swój smak, ale także za swoje potencjalne korzyści dla zdrowia. Może być stosowany jako naturalny środek wspomagający układ trawienny, pomagający w łagodzeniu stanów zapalnych oraz wspierający układ odpornościowy. Ponadto, jego subtelny smak sprawia, że jest doskonałym dodatkiem do różnych potraw i napojów, zarówno na ciepło, jak i na zimno.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Lipowy 1L',
      price: new FormControl(50),
      description: 'Miód lipowy to wyjątkowy i ceniony rodzaj miodu, pozyskiwany z nektaru kwiatów lipy (Tilia). Lipa, znana również jako lipowiec, to drzewo lub krzew, które w okresie kwitnienia wytwarza obfite ilości aromatycznego nektaru. Miód lipowy ma charakterystyczny, delikatny smak o wyrazistych nutach kwiatowych oraz lekko miętowych lub miętowo-cytrynowych akcentach. Miód lipowy jest znany z zawartości przeciwzapalnych, antyoksydacyjnych oraz uspokajających składników. Może mieć pozytywny wpływ na układ odpornościowy, układ pokarmowy oraz pomagać w łagodzeniu dolegliwości związanych z gardłem i układem oddechowym. Wspomaga również procesy trawienne i może działać kojąco na nerwy.Ze względu na swój unikalny smak i właściwości zdrowotne, miód lipowy jest często wybierany jako doskonały dodatek do herbaty, napojów, potraw, a także jako naturalny słodzik w kuchni. Jest również ceniony w przemyśle kosmetycznym, gdzie wykorzystuje się go w produktach do pielęgnacji skóry.',
      quantity: 0,
      status: undefined
    },
    {
      name: 'Miód Lipowy 2L',
      price: new FormControl(95),
      description: 'Miód lipowy to wyjątkowy i ceniony rodzaj miodu, pozyskiwany z nektaru kwiatów lipy (Tilia). Lipa, znana również jako lipowiec, to drzewo lub krzew, które w okresie kwitnienia wytwarza obfite ilości aromatycznego nektaru. Miód lipowy ma charakterystyczny, delikatny smak o wyrazistych nutach kwiatowych oraz lekko miętowych lub miętowo-cytrynowych akcentach. Miód lipowy jest znany z zawartości przeciwzapalnych, antyoksydacyjnych oraz uspokajających składników. Może mieć pozytywny wpływ na układ odpornościowy, układ pokarmowy oraz pomagać w łagodzeniu dolegliwości związanych z gardłem i układem oddechowym. Wspomaga również procesy trawienne i może działać kojąco na nerwy.Ze względu na swój unikalny smak i właściwości zdrowotne, miód lipowy jest często wybierany jako doskonały dodatek do herbaty, napojów, potraw, a także jako naturalny słodzik w kuchni. Jest również ceniony w przemyśle kosmetycznym, gdzie wykorzystuje się go w produktach do pielęgnacji skóry.',
      quantity: 0,
      status: undefined
    },
  ]
  
  

  getProducts(): Product[] {
    return this.products;
  }

  getProductsObs(): Observable<Product[]>{
    return this.productsObs.asObservable()
  }


  getProductsPages(): Product[]{
    return this.productsPage
  }
  getProductByName(name: string): Product | undefined {
    const productFromFirstArray = this.products.find(product => product.name === name);
    const productFromSecondArray = this.productsPage.find(product => product.name === name);
    
    return productFromFirstArray || productFromSecondArray;
  }

  

}
