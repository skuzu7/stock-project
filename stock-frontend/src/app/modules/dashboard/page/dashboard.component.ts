import { Component, OnInit } from '@angular/core';
import { ModulosService } from './../../../services/user/modulos.service';
import { TranslateService } from '@ngx-translate/core';
import { faEnvelope, faSearchDollar, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface Modulo {
  Descricao: string;
  subModulos: any[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
getIcon(descricao: string) {
  if (descricao.includes('e-Malote Web')) return faEnvelope;
  if (descricao.includes('Auditoria')) return faSearchDollar;
  if (descricao.includes('Revisao')) return faEdit;

  return faInfoCircle; // padrão
}




  modulos: Modulo[] = [];
  loading = false;

  constructor(private modulosService: ModulosService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadModulos();
    this.setInitialLanguage('pt');
  }

  loadModulos(): void {
    this.loading = true;
    this.modulosService.listarModulos().subscribe({
      next: (data) => {
        this.modulos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar módulos:', error);
        this.loading = false;
      }
    });
  }

  setInitialLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}