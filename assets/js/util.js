var RADIAN = Math.PI / 180.0;
var PI2 = 2 * Math.PI;

function pointOnArc(center, R, angle){
    var radians = (angle - 90) * RADIAN;
    return [center[0] + R * Math.cos(radians), center[1] + R * Math.sin(radians)];
}

function drawCircle(center, R, width){
    var innerR = R - width;
    var x = center[0];
    var y = center[1];
  
    return ['M', x - R, y, 'A', R, R, 0, 1, 0, x + R, y, 'A', R, R, 0, 1, 0, x - R, y, 'M', x - innerR, y, 'A', innerR, innerR, 0, 1, 0, x + innerR, y, 'A', innerR, innerR, 0, 1, 0, x - innerR, y, 'Z'];
}

function arc(center, R, start, end, w, corner, returnPoints ){
    var points = void 0;
    if (Math.abs(end - start) === 360) {
      points = drawCircle(center, R, w);
      return returnPoints ? points : points.join(' ');
    }
  
    var innerR = R - w;
    var circumference = Math.abs(end - start);
    corner = Math.min(w / 2, corner);
  
    if (360 * (corner / (Math.PI * (R - w))) > Math.abs(start - end)) {
      corner = circumference / 360 * innerR * Math.PI;
    }
  
    // inner and outer radiuses
    var innerR2 = innerR + corner;
    var outerRadius = R - corner;
  
    // butts corner points
    var oStart = pointOnArc(center, outerRadius, start);
    var oEnd = pointOnArc(center, outerRadius, end);
  
    var iStart = pointOnArc(center, innerR2, start);
    var iEnd = pointOnArc(center, innerR2, end);
  
    var iSection = 360 * (corner / (PI2 * innerR));
    var oSection = 360 * (corner / (PI2 * R));
  
    // arcs endpoints
    var iArcStart = pointOnArc(center, innerR, start + iSection);
    var iArcEnd = pointOnArc(center, innerR, end - iSection);
  
    var oArcStart = pointOnArc(center, R, start + oSection);
    var oArcEnd = pointOnArc(center, R, end - oSection);
  
    var arcSweep1 = circumference > 180 + 2 * oSection ? 1 : 0;
    var arcSweep2 = circumference > 180 + 2 * iSection ? 1 : 0;
  
    points = [
        // begin path
        "M", oStart[0], oStart[1],
        // outer start corner
        "A", corner, corner, 0, 0, 1, oArcStart[0], oArcStart[1],
        // outer main arc
        "A", R, R, 0, arcSweep1, 1, oArcEnd[0], oArcEnd[1],
        // outer end corner
        "A", corner, corner, 0, 0, 1, oEnd[0], oEnd[1],
        // end butt
        "L", iEnd[0], iEnd[1],
        // inner end corner
        "A", corner, corner, 0, 0, 1, iArcEnd[0], iArcEnd[1],
        // inner arc
        "A", innerR, innerR, 0, arcSweep2, 0, iArcStart[0], iArcStart[1],
        // inner start corner
        "A", corner, corner, 0, 0, 1, iStart[0], iStart[1], "Z" // end path
    ];

    return returnPoints ? points : points.join(' ');
}

function getSectorPath(x, y, r, a1, a2){
    const degtorad = Math.PI / 180;
    const halfOuterDiameter = r / 2;
    const cr = halfOuterDiameter - 5;
    const cx1 = (Math.cos(degtorad * a2) * cr) + x;
    const cy1 = (-Math.sin(degtorad * a2) * cr) + y;
    const cx2 = (Math.cos(degtorad * a1) * cr) + x;
    const cy2 = (-Math.sin(degtorad * a1) * cr) + y;

    return "M" + x + " " + y + " " + cx1 + " " + cy1 + " A" + cr + " " + cr + " 0 0 1 " + cx2 + " " + cy2 + "Z";
}

