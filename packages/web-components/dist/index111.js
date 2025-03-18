import "./index23.js";
import { Color as u } from "./index24.js";
import { BLEND_MODES as S } from "./index164.js";
import { Circle as x } from "./index25.js";
import { Ellipse as T } from "./index26.js";
import { Polygon as y } from "./index27.js";
import { Rectangle as v } from "./index28.js";
import { RoundedRectangle as D } from "./index29.js";
import "./index30.js";
import { Matrix as C } from "./index31.js";
import "./index32.js";
import { Point as M } from "./index33.js";
import "./index34.js";
import { PI_2 as P, SHAPES as I } from "./index240.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import { Shader as E } from "./index182.js";
import { UniformGroup as R } from "./index183.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import { Texture as f } from "./index131.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import { State as N } from "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index102.js";
import { Container as B } from "./index103.js";
import "./index104.js";
import { curves as F, LINE_CAP as O, LINE_JOIN as A } from "./index264.js";
import { GraphicsGeometry as G } from "./index112.js";
import { FillStyle as z } from "./index265.js";
import { LineStyle as L } from "./index266.js";
import "./index110.js";
import { QuadraticUtils as H } from "./index267.js";
import { BezierUtils as U } from "./index268.js";
import { ArcUtils as w } from "./index269.js";
const _ = {}, b = class d extends B {
  /**
   * @param geometry - Geometry to use, if omitted will create a new GraphicsGeometry instance.
   */
  constructor(t = null) {
    super(), this.shader = null, this.pluginName = "batch", this.currentPath = null, this.batches = [], this.batchTint = -1, this.batchDirty = -1, this.vertexData = null, this._fillStyle = new z(), this._lineStyle = new L(), this._matrix = null, this._holeMode = !1, this.state = N.for2d(), this._geometry = t || new G(), this._geometry.refCount++, this._transformID = -1, this._tintColor = new u(16777215), this.blendMode = S.NORMAL;
  }
  /**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
   * @readonly
   */
  get geometry() {
    return this._geometry;
  }
  /**
   * Creates a new Graphics object with the same values as this one.
   * Note that only the geometry of the object is cloned, not its transform (position,scale,etc)
   * @returns - A clone of the graphics object
   */
  clone() {
    return this.finishPoly(), new d(this._geometry);
  }
  /**
   * The blend mode to be applied to the graphic shape. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
   * primitive in the GraphicsGeometry list is rendered sequentially, modes
   * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
   * be applied per-primitive.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  set blendMode(t) {
    this.state.blendMode = t;
  }
  get blendMode() {
    return this.state.blendMode;
  }
  /**
   * The tint applied to each graphic shape. This is a hex value. A value of
   * 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */
  get tint() {
    return this._tintColor.value;
  }
  set tint(t) {
    this._tintColor.setValue(t);
  }
  /**
   * The current fill style.
   * @readonly
   */
  get fill() {
    return this._fillStyle;
  }
  /**
   * The current line style.
   * @readonly
   */
  get line() {
    return this._lineStyle;
  }
  lineStyle(t = null, r = 0, e, i = 0.5, s = !1) {
    return typeof t == "number" && (t = { width: t, color: r, alpha: e, alignment: i, native: s }), this.lineTextureStyle(t);
  }
  /**
   * Like line style but support texture for line fill.
   * @param [options] - Collection of options for setting line style.
   * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to use
   * @param {PIXI.ColorSource} [options.color=0x0] - color of the line to draw, will update the objects stored style.
   *  Default 0xFFFFFF if texture present.
   * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
   * @param {PIXI.Matrix} [options.matrix=null] - Texture matrix to transform texture
   * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
   *        WebGL only.
   * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
   * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
   * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
   * @param {number}[options.miterLimit=10] - miter limit ratio
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */
  lineTextureStyle(t) {
    const r = {
      width: 0,
      texture: f.WHITE,
      color: t != null && t.texture ? 16777215 : 0,
      matrix: null,
      alignment: 0.5,
      native: !1,
      cap: O.BUTT,
      join: A.MITER,
      miterLimit: 10
    };
    t = Object.assign(r, t), this.normalizeColor(t), this.currentPath && this.startPoly();
    const e = t.width > 0 && t.alpha > 0;
    return e ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._lineStyle, { visible: e }, t)) : this._lineStyle.reset(), this;
  }
  /**
   * Start a polygon object internally.
   * @protected
   */
  startPoly() {
    if (this.currentPath) {
      const t = this.currentPath.points, r = this.currentPath.points.length;
      r > 2 && (this.drawShape(this.currentPath), this.currentPath = new y(), this.currentPath.closeStroke = !1, this.currentPath.points.push(t[r - 2], t[r - 1]));
    } else
      this.currentPath = new y(), this.currentPath.closeStroke = !1;
  }
  /**
   * Finish the polygon object.
   * @protected
   */
  finishPoly() {
    this.currentPath && (this.currentPath.points.length > 2 ? (this.drawShape(this.currentPath), this.currentPath = null) : this.currentPath.points.length = 0);
  }
  /**
   * Moves the current drawing position to x, y.
   * @param x - the X coordinate to move to
   * @param y - the Y coordinate to move to
   * @returns - This Graphics object. Good for chaining method calls
   */
  moveTo(t, r) {
    return this.startPoly(), this.currentPath.points[0] = t, this.currentPath.points[1] = r, this;
  }
  /**
   * Draws a line using the current line style from the current drawing position to (x, y);
   * The current drawing position is then set to (x, y).
   * @param x - the X coordinate to draw to
   * @param y - the Y coordinate to draw to
   * @returns - This Graphics object. Good for chaining method calls
   */
  lineTo(t, r) {
    this.currentPath || this.moveTo(0, 0);
    const e = this.currentPath.points, i = e[e.length - 2], s = e[e.length - 1];
    return (i !== t || s !== r) && e.push(t, r), this;
  }
  /**
   * Initialize the curve
   * @param x
   * @param y
   */
  _initCurve(t = 0, r = 0) {
    this.currentPath ? this.currentPath.points.length === 0 && (this.currentPath.points = [t, r]) : this.moveTo(t, r);
  }
  /**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - This Graphics object. Good for chaining method calls
   */
  quadraticCurveTo(t, r, e, i) {
    this._initCurve();
    const s = this.currentPath.points;
    return s.length === 0 && this.moveTo(0, 0), H.curveTo(t, r, e, i, s), this;
  }
  /**
   * Calculate the points for a bezier curve and then draws it.
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns This Graphics object. Good for chaining method calls
   */
  bezierCurveTo(t, r, e, i, s, a) {
    return this._initCurve(), U.curveTo(t, r, e, i, s, a, this.currentPath.points), this;
  }
  /**
   * The `arcTo` method creates an arc/curve between two tangents on the canvas.
   * The first tangent is from the start point to the first control point,
   * and the second tangent is from the first control point to the second control point.
   * Note that the second control point is not necessarily the end point of the arc.
   *
   * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @returns - This Graphics object. Good for chaining method calls
   */
  arcTo(t, r, e, i, s) {
    this._initCurve(t, r);
    const a = this.currentPath.points, o = w.curveTo(t, r, e, i, s, a);
    if (o) {
      const { cx: h, cy: n, radius: l, startAngle: c, endAngle: m, anticlockwise: p } = o;
      this.arc(h, n, l, c, m, p);
    }
    return this;
  }
  /**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @returns - This Graphics object. Good for chaining method calls
   */
  arc(t, r, e, i, s, a = !1) {
    if (i === s)
      return this;
    if (!a && s <= i ? s += P : a && i <= s && (i += P), s - i === 0)
      return this;
    const o = t + Math.cos(i) * e, h = r + Math.sin(i) * e, n = this._geometry.closePointEps;
    let l = this.currentPath ? this.currentPath.points : null;
    if (l) {
      const c = Math.abs(l[l.length - 2] - o), m = Math.abs(l[l.length - 1] - h);
      c < n && m < n || l.push(o, h);
    } else
      this.moveTo(o, h), l = this.currentPath.points;
    return w.arc(o, h, t, r, e, i, s, a, l), this;
  }
  /**
   * Specifies a simple one-color fill that subsequent calls to other Graphics methods
   * (such as lineTo() or drawCircle()) use when drawing.
   * @param {PIXI.ColorSource} color - the color of the fill
   * @param alpha - the alpha of the fill, will override the color's alpha
   * @returns - This Graphics object. Suitable for chaining method calls
   */
  beginFill(t = 0, r) {
    return this.beginTextureFill({ texture: f.WHITE, color: t, alpha: r });
  }
  /**
   * Normalize the color input from options for line style or fill
   * @param {PIXI.IFillStyleOptions} options - Fill style object.
   */
  normalizeColor(t) {
    const r = u.shared.setValue(t.color ?? 0);
    t.color = r.toNumber(), t.alpha ?? (t.alpha = r.alpha);
  }
  /**
   * Begin the texture fill.
   * Note: The wrap mode of the texture is forced to REPEAT on render.
   * @param options - Fill style object.
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to fill
   * @param {PIXI.ColorSource} [options.color=0xffffff] - Background to fill behind texture
   * @param {number} [options.alpha] - Alpha of fill, overrides the color's alpha
   * @param {PIXI.Matrix} [options.matrix=null] - Transform matrix
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */
  beginTextureFill(t) {
    const r = {
      texture: f.WHITE,
      color: 16777215,
      matrix: null
    };
    t = Object.assign(r, t), this.normalizeColor(t), this.currentPath && this.startPoly();
    const e = t.alpha > 0;
    return e ? (t.matrix && (t.matrix = t.matrix.clone(), t.matrix.invert()), Object.assign(this._fillStyle, { visible: e }, t)) : this._fillStyle.reset(), this;
  }
  /**
   * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
   * @returns - This Graphics object. Good for chaining method calls
   */
  endFill() {
    return this.finishPoly(), this._fillStyle.reset(), this;
  }
  /**
   * Draws a rectangle shape.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawRect(t, r, e, i) {
    return this.drawShape(new v(t, r, e, i));
  }
  /**
   * Draw a rectangle shape with rounded/beveled corners.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @param radius - Radius of the rectangle corners
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawRoundedRect(t, r, e, i, s) {
    return this.drawShape(new D(t, r, e, i, s));
  }
  /**
   * Draws a circle.
   * @param x - The X coordinate of the center of the circle
   * @param y - The Y coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawCircle(t, r, e) {
    return this.drawShape(new x(t, r, e));
  }
  /**
   * Draws an ellipse.
   * @param x - The X coordinate of the center of the ellipse
   * @param y - The Y coordinate of the center of the ellipse
   * @param width - The half width of the ellipse
   * @param height - The half height of the ellipse
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawEllipse(t, r, e, i) {
    return this.drawShape(new T(t, r, e, i));
  }
  /**
   * Draws a polygon using the given path.
   * @param {number[]|PIXI.IPointData[]|PIXI.Polygon} path - The path data used to construct the polygon.
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawPolygon(...t) {
    let r, e = !0;
    const i = t[0];
    i.points ? (e = i.closeStroke, r = i.points) : Array.isArray(t[0]) ? r = t[0] : r = t;
    const s = new y(r);
    return s.closeStroke = e, this.drawShape(s), this;
  }
  /**
   * Draw any shape.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - Shape to draw
   * @returns - This Graphics object. Good for chaining method calls
   */
  drawShape(t) {
    return this._holeMode ? this._geometry.drawHole(t, this._matrix) : this._geometry.drawShape(
      t,
      this._fillStyle.clone(),
      this._lineStyle.clone(),
      this._matrix
    ), this;
  }
  /**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This Graphics object. Good for chaining method calls
   */
  clear() {
    return this._geometry.clear(), this._lineStyle.reset(), this._fillStyle.reset(), this._boundsID++, this._matrix = null, this._holeMode = !1, this.currentPath = null, this;
  }
  /**
   * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
   * masked with gl.scissor.
   * @returns - True if only 1 rect.
   */
  isFastRect() {
    const t = this._geometry.graphicsData;
    return t.length === 1 && t[0].shape.type === I.RECT && !t[0].matrix && !t[0].holes.length && !(t[0].lineStyle.visible && t[0].lineStyle.width);
  }
  /**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */
  _render(t) {
    this.finishPoly();
    const r = this._geometry;
    r.updateBatches(), r.batchable ? (this.batchDirty !== r.batchDirty && this._populateBatches(), this._renderBatched(t)) : (t.batch.flush(), this._renderDirect(t));
  }
  /** Populating batches for rendering. */
  _populateBatches() {
    const t = this._geometry, r = this.blendMode, e = t.batches.length;
    this.batchTint = -1, this._transformID = -1, this.batchDirty = t.batchDirty, this.batches.length = e, this.vertexData = new Float32Array(t.points);
    for (let i = 0; i < e; i++) {
      const s = t.batches[i], a = s.style.color, o = new Float32Array(
        this.vertexData.buffer,
        s.attribStart * 4 * 2,
        s.attribSize * 2
      ), h = new Float32Array(
        t.uvsFloat32.buffer,
        s.attribStart * 4 * 2,
        s.attribSize * 2
      ), n = new Uint16Array(
        t.indicesUint16.buffer,
        s.start * 2,
        s.size
      ), l = {
        vertexData: o,
        blendMode: r,
        indices: n,
        uvs: h,
        _batchRGB: u.shared.setValue(a).toRgbArray(),
        _tintRGB: a,
        _texture: s.style.texture,
        alpha: s.style.alpha,
        worldAlpha: 1
      };
      this.batches[i] = l;
    }
  }
  /**
   * Renders the batches using the BathedRenderer plugin
   * @param renderer - The renderer
   */
  _renderBatched(t) {
    if (this.batches.length) {
      t.batch.setObjectRenderer(t.plugins[this.pluginName]), this.calculateVertices(), this.calculateTints();
      for (let r = 0, e = this.batches.length; r < e; r++) {
        const i = this.batches[r];
        i.worldAlpha = this.worldAlpha * i.alpha, t.plugins[this.pluginName].render(i);
      }
    }
  }
  /**
   * Renders the graphics direct
   * @param renderer - The renderer
   */
  _renderDirect(t) {
    const r = this._resolveDirectShader(t), e = this._geometry, i = this.worldAlpha, s = r.uniforms, a = e.drawCalls;
    s.translationMatrix = this.transform.worldTransform, u.shared.setValue(this._tintColor).premultiply(i).toArray(s.tint), t.shader.bind(r), t.geometry.bind(e, r), t.state.set(this.state);
    for (let o = 0, h = a.length; o < h; o++)
      this._renderDrawCallDirect(t, e.drawCalls[o]);
  }
  /**
   * Renders specific DrawCall
   * @param renderer
   * @param drawCall
   */
  _renderDrawCallDirect(t, r) {
    const { texArray: e, type: i, size: s, start: a } = r, o = e.count;
    for (let h = 0; h < o; h++)
      t.texture.bind(e.elements[h], h);
    t.geometry.draw(i, s, a);
  }
  /**
   * Resolves shader for direct rendering
   * @param renderer - The renderer
   */
  _resolveDirectShader(t) {
    let r = this.shader;
    const e = this.pluginName;
    if (!r) {
      if (!_[e]) {
        const { maxTextures: i } = t.plugins[e], s = new Int32Array(i);
        for (let h = 0; h < i; h++)
          s[h] = h;
        const a = {
          tint: new Float32Array([1, 1, 1, 1]),
          translationMatrix: new C(),
          default: R.from({ uSamplers: s }, !0)
        }, o = t.plugins[e]._shader.program;
        _[e] = new E(o, a);
      }
      r = _[e];
    }
    return r;
  }
  /**
   * Retrieves the bounds of the graphic shape as a rectangle object.
   * @see PIXI.GraphicsGeometry#bounds
   */
  _calculateBounds() {
    this.finishPoly();
    const t = this._geometry;
    if (!t.graphicsData.length)
      return;
    const { minX: r, minY: e, maxX: i, maxY: s } = t.bounds;
    this._bounds.addFrame(this.transform, r, e, i, s);
  }
  /**
   * Tests if a point is inside this graphics object
   * @param point - the point to test
   * @returns - the result of the test
   */
  containsPoint(t) {
    return this.worldTransform.applyInverse(t, d._TEMP_POINT), this._geometry.containsPoint(d._TEMP_POINT);
  }
  /** Recalculate the tint by applying tint to batches using Graphics tint. */
  calculateTints() {
    if (this.batchTint !== this.tint) {
      this.batchTint = this._tintColor.toNumber();
      for (let t = 0; t < this.batches.length; t++) {
        const r = this.batches[t];
        r._tintRGB = u.shared.setValue(this._tintColor).multiply(r._batchRGB).toLittleEndianNumber();
      }
    }
  }
  /** If there's a transform update or a change to the shape of the geometry, recalculate the vertices. */
  calculateVertices() {
    const t = this.transform._worldID;
    if (this._transformID === t)
      return;
    this._transformID = t;
    const r = this.transform.worldTransform, e = r.a, i = r.b, s = r.c, a = r.d, o = r.tx, h = r.ty, n = this._geometry.points, l = this.vertexData;
    let c = 0;
    for (let m = 0; m < n.length; m += 2) {
      const p = n[m], g = n[m + 1];
      l[c++] = e * p + s * g + o, l[c++] = a * g + i * p + h;
    }
  }
  /**
   * Closes the current path.
   * @returns - Returns itself.
   */
  closePath() {
    const t = this.currentPath;
    return t && (t.closeStroke = !0, this.finishPoly()), this;
  }
  /**
   * Apply a matrix to the positional data.
   * @param matrix - Matrix to use for transform current shape.
   * @returns - Returns itself.
   */
  setMatrix(t) {
    return this._matrix = t, this;
  }
  /**
   * Begin adding holes to the last draw shape
   * IMPORTANT: holes must be fully inside a shape to work
   * Also weirdness ensues if holes overlap!
   * Ellipses, Circles, Rectangles and Rounded Rectangles cannot be holes or host for holes in CanvasRenderer,
   * please use `moveTo` `lineTo`, `quadraticCurveTo` if you rely on pixi-legacy bundle.
   * @returns - Returns itself.
   */
  beginHole() {
    return this.finishPoly(), this._holeMode = !0, this;
  }
  /**
   * End adding holes to the last draw shape.
   * @returns - Returns itself.
   */
  endHole() {
    return this.finishPoly(), this._holeMode = !1, this;
  }
  /**
   * Destroys the Graphics object.
   * @param options - Options parameter. A boolean will act as if all
   *  options have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have
   *  their destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */
  destroy(t) {
    this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose(), this._matrix = null, this.currentPath = null, this._lineStyle.destroy(), this._lineStyle = null, this._fillStyle.destroy(), this._fillStyle = null, this._geometry = null, this.shader = null, this.vertexData = null, this.batches.length = 0, this.batches = null, super.destroy(t);
  }
};
b.curves = F, /**
* Temporary point to use for containsPoint.
* @private
*/
b._TEMP_POINT = new M();
let nr = b;
export {
  nr as Graphics
};
//# sourceMappingURL=index111.js.map
