import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Application, DocumentUpload } from '../../core/api.models';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './upload.page.html',
})
export class UploadPage implements OnInit {
  readonly applicationId = signal<number | null>(null);
  readonly applications = signal<Application[]>([]);
  readonly uploaded = signal<DocumentUpload | null>(null);
  readonly error = signal<string | null>(null);
  readonly uploading = signal(false);

  selectedFile: File | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('applicationId');
    this.applicationId.set(idParam ? Number(idParam) : null);
    this.api.listApplications().subscribe({
      next: (apps) => this.applications.set(apps),
      error: () => this.error.set('Could not load your applications.'),
    });
  }

  selectApplication(id: number): void {
    this.applicationId.set(id);
    this.uploaded.set(null);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  upload(): void {
    const appId = this.applicationId();
    if (!appId || !this.selectedFile) {
      this.error.set('Select an application and a file first.');
      return;
    }
    this.error.set(null);
    this.uploading.set(true);
    this.api.uploadDocument(appId, this.selectedFile).subscribe({
      next: (doc) => {
        this.uploading.set(false);
        this.uploaded.set(doc);
      },
      error: () => {
        this.uploading.set(false);
        this.error.set('Upload failed.');
      },
    });
  }
}
