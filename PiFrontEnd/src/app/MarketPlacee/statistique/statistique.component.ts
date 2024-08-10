import { Component, ElementRef, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import { ProductService } from 'src/app/Service/product.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent {
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getStatistiquesRating();
    this.fetchMostPurchasedCategory();

  }
  statistiques!: string[];

  categories: { nom: string, nombreEtoiles: number }[] = [];

  getStatistiquesRating() {
    this.productService.statistiqueRating().subscribe(
      data => {
        this.statistiques = data;
        this.processStatistiques();
        console.log('Statistiques des ratings : ', this.statistiques);
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération des statistiques des ratings : ', error);
      }
    );
  }

  processStatistiques(): void {
    this.categories = this.statistiques.map(categorie => {
      const [nom, nombreEtoiles] = categorie.split(',');
      return { nom, nombreEtoiles: parseInt(nombreEtoiles) };
    });
  }

  generateArray(n: number): any[] {
    return Array.from({ length: n });
  }
  ///////////////////////////////////////////////
  mostPurchasedCategory: string | null = null;
@ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
private chartContext: CanvasRenderingContext2D | null = null;
private chart: Chart | null = null;
ngAfterViewInit(): void {
  this.initializeChart();
}
// Au chargement de la page ou au démarrage de l'application
initializeChart(): void {
  this.chartContext = this.chartCanvas.nativeElement.getContext('2d');
  if (this.chartContext) {
    this.chart = new Chart(this.chartContext, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Vos données',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    console.error('Contexte du canevas null');
  }
}

// Plus tard, lorsque vous avez les données à afficher sur le graphique
fetchMostPurchasedCategory(): void {
  this.productService.getMostPurchasedCategory()
    .subscribe(response => {
      try {
        console.log(response);
        
        const data: string[] = response;
        data.forEach(item => {
          const splitData = item.split(',');
          const label = splitData[0].trim(); // Récupérer le label de la catégorie
          const value = parseInt(splitData[1].trim(), 10); // Récupérer la valeur numérique

          // Ajouter les labels et les valeurs au graphique
          if (this.chart && this.chart.data && this.chart.data.labels && this.chart.data.datasets && this.chart.data.datasets[0] && this.chart.data.datasets[0].data) {
            this.chart.data.labels.push(label);
            this.chart.data.datasets[0].data.push(value);
            this.chart.update();
          } else {
            console.error('Labels or data array is undefined.');
          }
        });
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'analyse de la réponse : ', error);
      }
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération de la catégorie la plus achetée : ', error);
    });
}






generatePdf(): void {
  if (!this.chart || !this.chartCanvas) {
    console.error('Le graphique ou le canvas n\'est pas initialisé.');
    return;
  }

  // Obtenez le contexte 2D du canvas
  const canvas = this.chartCanvas.nativeElement;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Impossible d\'obtenir le contexte 2D du canvas.');
    return;
  }
  const maxWidth = 300; // Largeur maximale
  const maxHeight = 100; // Hauteur maximale

  // Calculez le facteur d'échelle
  const scaleX = maxWidth / canvas.width;
  const scaleY = maxHeight / canvas.height;
  const scale = Math.min(scaleX, scaleY); // Choisissez le facteur d'échelle le plus petit pour conserver les proportions

  // Nouvelles dimensions du graphique dans le PDF
  const scaledWidth = canvas.width * scale;
  const scaledHeight = canvas.height * scale;

  // Créez un objet jspdf
  const pdf = new jspdf('p', 'mm', 'a4');

  // Créez une image à partir du canvas
  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  // Ajoutez l'image au PDF
  pdf.addImage(imgData, 'JPEG', 0, 10, scaledWidth,scaledHeight);

  // Téléchargez le PDF
  pdf.save('chart.pdf');
}
generatePdfButtonClicked(): void {
  this.generatePdf();
}
}
