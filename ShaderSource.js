

function vertex() {

    var vertex = [
        'precision highp float;',
        'varying vec2 vUv;',
        'varying vec3 WHlocation;',
        'varying vec3 pos;',
        'uniform vec3 wormholePos;',
        'uniform vec2 resolution;',
        'uniform mat4 originalProjMatrix;',
        'uniform mat4 originalModelMatrix;',


        'void main() {',

    //    'pos = position * 2.0;',
        '  vUv = uv;',
        'vec4 temp = projectionMatrix * modelViewMatrix * vec4( wormholePos, 0.5 );',
        '  WHlocation = vec3(( 0.5 * temp.xy ) / temp.w + 0.5, temp.z) * vec3(resolution, 1.0);',
        '  gl_Position = /*projectionMatrix * modelViewMatrix */ vec4( 2.0*position.xy / resolution, 1.0, 1.0 );',

        '}'

        ].join('\n');


    return vertex;
}


function fragPassTwo() {

    var fragRender = [

        //'precision highp float;',
        'varying vec2 vUv;',
        'varying vec3 WHlocation;',
        'varying vec3 pos;',
        'uniform sampler2D firstPass;',
        'uniform vec2 resolution;',
        'uniform vec3 camPosition;',
        'uniform vec3 wormholePos;',

        'void main() {',

       // 'vec2 warp = normalize(WHlocation - gl_FragCoord) * pow(distance(WHlocation, gl_FragCoord), -2.0) * 30.0;',
        'vec2 warp = vec2(0.0, 0.0);',
        'if (WHlocation.z > 0.0) {',
        'warp = normalize(WHlocation.xy - gl_FragCoord.xy) *' + 
         'pow(distance(WHlocation.xy, gl_FragCoord.xy), -2.0) * 50000000000.0/pow(distance(camPosition,wormholePos),3.0);',
        // warp.y = -warp.y;
        '}',

        '   gl_FragColor = texture2D( firstPass, (vUv + warp));',

        '}'

        ].join('\n');

    return fragRender;

}