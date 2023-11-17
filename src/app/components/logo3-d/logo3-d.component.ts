import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-logo3-d',
  templateUrl: './logo3-d.component.html',
  styleUrls: ['./logo3-d.component.scss']
})
export class Logo3DComponent implements OnInit, AfterViewInit {

  constructor () { }

  ngOnInit(): void {
    // Rien à faire dans ngOnInit, déplacez la logique dans ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.createLogo();
  }

  createLogo(): void {
    // Récupère l'élément de canevas à partir de l'ID 'logo-canvas'
    const canvas = document.getElementById('logo-canvas') as HTMLCanvasElement;

    // Vérifie si le canevas est trouvé
    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }

    // Initialise une nouvelle scène Three.js
    const scene = new THREE.Scene();

    // Définit les propriétés du matériau du logo
    const material = new THREE.MeshStandardMaterial({
      color: '#fc9900',
      metalness: 1,
      roughness: 0.2,
      opacity: 0.7,
      transparent: true,
    });

    // Augmentez l'intensité de la lumière ambiante, mais réduisez celle de la lumière ponctuelle
    const ambientLight = new THREE.AmbientLight(0xffffff, 3000);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 10000);
    pointLight.position.set(3, 4, 1);  // Ajustez la position de la lumière ponctuelle
    scene.add(pointLight);

    // Crée une géométrie de cône et un maillage avec le matériau,
    // puis ajoute le maillage à la scène
    const pyramidGeometry = new THREE.ConeGeometry(2.7, 4, 5);//diametre, hauteur, nombre de faces
    const pyramid = new THREE.Mesh(pyramidGeometry, material);
    scene.add(pyramid);

    // Définit les dimensions du canevas
    const canvasSizes = {
      width: 125, // ajustez la largeur selon vos besoins
      height: 90, // ajustez la hauteur selon vos besoins

      background: '#152131', // ajustez la couleur d'arrière-plan selon vos besoins
    };

    // Initialise une caméra perspective et la place à une certaine distance
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 3;
    scene.add(camera);

    // Initialise le moteur de rendu Three.js et l'attache au canevas
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    // Définit la couleur d'arrière-plan du rendu
    renderer.setClearColor(0x152131, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    // Écouteur de redimensionnement pour mettre à jour la caméra et le rendu
    // lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasSizes.width, canvasSizes.height);
    });

    // Initialise une horloge pour gérer le temps
    const clock = new THREE.Clock();

    // Fonction d'animation du logo
    const animateLogo = () => {
      const elapsedTime = clock.getElapsedTime();
      //vitesse de rotation de la pyramide
      pyramid.rotation.y = elapsedTime * 0.15;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animateLogo);
    };

    // Lancement de l'animation
    animateLogo();
  }
}
