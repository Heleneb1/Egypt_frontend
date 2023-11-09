import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-logo3-d',
  templateUrl: './logo3-d.component.html',
  styleUrls: ['./logo3-d.component.scss']
})
export class Logo3DComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private pyramid: THREE.Mesh = new THREE.Mesh();

  constructor (private ngZone: NgZone) { }

  ngOnInit() {
    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.createPyramid();
  }

  createPyramid() {
    const pyramidMaterial = new THREE.MeshStandardMaterial({
      color: '#ffd700',
      metalness: 1,
      roughness: 0.2,
      opacity: 1,
      transparent: false,
    });

    const pyramidGeometry = new THREE.ConeGeometry(1, 1, 4);

    this.pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    this.scene.add(this.pyramid);
  }

  // animate() {
  //   this.ngZone.runOutsideAngular(() => {
  //     requestAnimationFrame(() => this.animate());
  //   });

  //   // Ajoutez ici toute logique d'animation ou de mise à jour de la scène

  //   this.renderer.render(this.scene, this.camera);
  // }
  animate() {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.animate());
    });

    // Ajoutez ici toute logique d'animation ou de mise à jour de la scène
    this.pyramid.rotation.x += 0.01;
    this.pyramid.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

}
