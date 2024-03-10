import * as THREE from 'three';
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
import * as Symbols from '$lib/symbols.js';
import { app } from '$lib/config.js';

export default class MetaSymbol {
	constructor(_textures) {
		const parent = this;

		this.clock = new THREE.Clock();
		this.particleCount = 16;
		this.textures = _textures;
		this.curves = new Array(this.particleCount);
		this.fixedTable = [];
		Symbols.default.simbols.map((simbol, indexSimbol) => {
			for (var i = 0; i < this.curves.length; i++) {
				const indexc = i % simbol.pos.length;
				if (this.curves[i] == undefined) {
					this.curves[i] = new THREE.CatmullRomCurve3();
				}
				let scale = 1.0;
				const pos = simbol.pos[indexc];
				if (i > simbol.pos.length - 1) {
					scale = 0.0;
				}
				this.curves[i].points.push(new THREE.Vector3(pos.x, pos.y, pos.s * scale));
			}

			this.fixedTable.push(indexSimbol / (Symbols.default.simbols.length - 1));
		});
		this.textureMix = 0.0;
		this.textureMixD = 0.0;
		this.backMix = 0.0;
		this.backMixD = 0.0;

		this.scrollPercent = 0.0;
		this.scrollPercentD = 0.0;
		this.scrollDelta = 0.0;

		// this.fondo0 = new THREE.Color(estilos[0].color)
		// this.fondo1 = new THREE.Color(estilos[1].color)
		const metaballScale = 35;
		const res = 80;

		this.material = new THREE.MeshMatcapMaterial({
			matcap: parent.textures[0]
		});
		this.material.matcap2 = null;
		this.material.matcapMix = 0.0;
		this.materialUniforms = null;
		this.material.onBeforeCompile = function (shader) {
			shader.uniforms.matcap2 = { value: parent.textures[1] };
			shader.uniforms.u_matcap_mix = { value: 0.0 };
			parent.materialUniforms = shader.uniforms;
			shader.fragmentShader = shader.fragmentShader.replace(
				'uniform sampler2D matcap;',
				`uniform sampler2D matcap;
                uniform sampler2D matcap2;
                uniform float  u_matcap_mix;`
			);
			shader.fragmentShader = shader.fragmentShader.replace(
				'vec4 matcapColor = texture2D( matcap, uv );',
				'vec4 matcapColor = mix(texture2D( matcap, uv ),texture2D( matcap2, uv ),u_matcap_mix);'
			);
		};
		this.material.needsUpdate = true;
		this.metaball = new MarchingCubes(res, this.material, true, true, 100000);
		this.metaball.position.set(0.0, 0.0, 0.0);
		this.metaball.scale.set(metaballScale, -metaballScale, metaballScale);
		this.metaball.isolation = 60;
		// this.modelToObject("../../model/ArtdaoSymbols_Luxi.fbx_1.fbx")

		document.onscroll = (e) => {
			const newS =
				((document.documentElement.scrollTop || document.body.scrollTop) /
					((document.documentElement.scrollHeight || document.body.scrollHeight) -
						document.documentElement.clientHeight)) *
				100;

			parent.scrollPercentD = newS;
			//document.getElementById('scrollProgress').innerText = 'Progreso : ' + scrollPercent.toFixed(2)
		};

		//    this.goTo(1)
	}

	getMesh() {
		return this.metaball;
	}

	goTo(_simbolId) {
		this.scrollPercentD = (_simbolId / (Symbols.default.simbols.length - 1)) * 100;
	}

	changeTexture(_index) {
		if (this.textureMixD == 0.0) {
			this.materialUniforms.matcap2.value = this.textures[_index];
			// this.fondo0.set(_scene.background)
			// this.fondo1.set(estilos[_index].color)
			this.textureMixD = 1.0;
		} else if (this.textureMixD == 1.0) {
			this.material.matcap = this.textures[_index];
			this.textureMixD = 0.0;
		}
		this.backMixD = 1.0;
		this.backMix = 0.0;
		// this.fondo0.set(_scene.background)
		// this.fondo1.set(estilos[_index].color)
	}

	update() {
		const time = this.clock.getElapsedTime();

		this.fixedTable.map((fixed, index) => {
			if (Math.abs(this.scrollPercentD - fixed * 100.0) < 10.0) {
				this.scrollPercentD = fixed * 100.0;
			}
		});

		//this.scrollPercent=this.scrollPercentD = (4/(Symbols.default.simbols.length-1))*100
		this.scrollPercent += (this.scrollPercentD - this.scrollPercent) * 0.05;
		this.textureMix += (this.textureMixD - this.textureMix) * 0.05;
		this.backMix += (this.backMixD - this.backMix) * 0.05;
		this.textureMix = THREE.MathUtils.clamp(this.textureMix, 0.0, 1.0);
		if (this.materialUniforms != undefined) {
			// this.fondo0.lerp(this.fondo1,this.backMix)
			this.materialUniforms.u_matcap_mix.value = this.textureMix;
		}
		this.metaball.reset();
		const percentNormalized = this.scrollPercent / 100.0;
		for (var i = 0; i < this.particleCount; i++) {
			const pos = this.curves[i].getPoint(percentNormalized);
			const scale = 1.0;
			const sScale = 1.0;

			this.metaball.addBall(
				0.5 - scale * 0.5 + pos.x * scale,
				0.5 + scale * 0.5 - pos.y * scale,
				0.5,
				pos.z * sScale,
				32
			);
		}
		this.metaball.update();

		this.metaball.position.y = Math.sin(time * app.LEVITATION_VEL) * app.LEVITATION_AMP;
		this.metaball.rotation.y = THREE.MathUtils.degToRad(
			Math.cos(time * app.ROT_Y_VEL) * app.ROT_Y_AMP
		);
	}

	modelToObject(_path, model, strenght) {
		const modelLoader = new FBXLoader();
		modelLoader.load(_path, (model) => {
			const ret = [];

			var box = new THREE.Box3().setFromObject(model);
			var center = new THREE.Vector3();
			box.getCenter(center);
			model.position.sub(center);

			const strenghts = [];
			let outStr = '';
			model.children.map((obj, i) => {
				const newPos = obj.position;
				newPos.x = THREE.MathUtils.mapLinear(newPos.x, box.min.x, box.max.x, 0.0, 1.0);
				newPos.y = THREE.MathUtils.mapLinear(newPos.y, box.max.y, box.min.y, 1.0, 0.0);
				newPos.z = THREE.MathUtils.mapLinear(newPos.z, box.min.z, box.max.z, 0.0, 1.0);
				outStr += '{x:' + newPos.x + ',y:' + newPos.y + ',z:' + newPos.z + ',s:0.5},' + '\n';
				strenghts.push(strenght);
				ret.push(newPos);
			});
			navigator.clipboard.writeText(outStr);

			console.log(outStr);
		});
	}

	dispose() {
		// this.metaball.dispose()
		this.material.dispose();

		//dispose textures
		this.textures.map((texture) => {
			texture.dispose();
		});

		//dispose material
		this.metaball.children.map((obj) => {
			obj.material.dispose();
		});

		// dispose objects
		this.metaball.children.map((obj) => {
			obj.geometry.dispose();
			obj.material.dispose();
		});
		this.metaball.geometry.dispose();
		this.metaball.material.dispose();
	}
}
