// Grainient — o gradiente granulado cobalto/âmbar do site LAMIT (lamit-site/src/components/Grainient.jsx),
// portado para WebGL2 puro, sem dependências. Na loja ele vive só dentro de faixas (.broadcast-band),
// nunca como fundo de página. Pausa fora da tela e com a aba oculta; com reduced-motion desenha um
// único frame; sem WebGL2 fica o fallback em CSS da própria faixa.

(function () {
  const canvases = document.querySelectorAll('.broadcast-band__canvas');
  if (canvases.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

  // Mesmo shader do site, com os parâmetros do GrainientBackground fixados como constantes
  const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;
const float uTimeSpeed = 0.25;
const float uColorBalance = 0.2;
const float uWarpStrength = 1.0;
const float uWarpFrequency = 5.0;
const float uWarpSpeed = 2.0;
const float uWarpAmplitude = 50.0;
const float uBlendSoftness = 0.05;
const float uRotationAmount = 500.0;
const float uNoiseScale = 2.0;
const float uGrainAmount = 0.1;
const float uGrainScale = 2.0;
const float uContrast = 1.5;
const float uZoom = 0.9;
const vec3 uColor1 = vec3(0.0392, 0.2, 0.5137);   // #0A3383
const vec3 uColor2 = vec3(0.7569, 0.4549, 0.0078); // #C17402
const vec3 uColor3 = vec3(0.0392, 0.2, 0.5137);   // #0A3383
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void main(){
  vec2 C = gl_FragCoord.xy;
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5;
  tuv/=uZoom;
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float amplitude=uWarpAmplitude/uWarpStrength;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*uWarpFrequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(uWarpFrequency*1.5)+warpTime)/(amplitude*0.5);
  float b=uColorBalance;
  float s=uBlendSoftness;
  float blendX=tuv.x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(uColor3,uColor2,S(edge0,edge1,blendX));
  vec3 layer2=mix(uColor2,uColor1,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  float grain=fract(sin(dot(uv*uGrainScale,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  fragColor=vec4(clamp(col,0.0,1.0),1.0);
}`;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Grainient: falha ao compilar shader', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  function setup(canvas) {
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return; // sem WebGL2: fica o fallback em CSS

    const vs = compile(gl, gl.VERTEX_SHADER, vertex);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Grainient: falha ao linkar programa', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Triângulo que cobre a tela inteira
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let visible = false;
    let frame = null;
    const start = performance.now();

    function resize() {
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(uResolution, width, height);
    }

    function draw(time) {
      resize();
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function loop(now) {
      draw((now - start) * 0.001);
      frame = requestAnimationFrame(loop);
    }

    function play() {
      if (frame || reducedMotion || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    }

    function pause() {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }

    draw(4.0);
    canvas.classList.add('is-ready');

    if (reducedMotion) {
      window.addEventListener('resize', () => draw(4.0));
      return;
    }

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) play(); else pause();
    }).observe(canvas);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else play();
    });
  }

  function init() {
    canvases.forEach((canvas) => {
      try {
        setup(canvas);
      } catch (error) {
        console.error('Grainient: erro ao iniciar', error);
      }
    });
  }

  // Efeito não é crítico: espera a página carregar e o navegador ficar ocioso
  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 1500 });
    } else {
      setTimeout(init, 200);
    }
  });
})();
